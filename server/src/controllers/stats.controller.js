import ContactSubmission from '../models/ContactSubmission.js'
import BlogPost from '../models/BlogPost.js'
import Project from '../models/Project.js'
import asyncHandler from '../middleware/asyncHandler.js'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function lastNDays(n) {
  const days = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    d.setUTCDate(d.getUTCDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export const getOverview = asyncHandler(async (req, res) => {
  const since = new Date()
  since.setUTCDate(since.getUTCDate() - 29)
  since.setUTCHours(0, 0, 0, 0)

  const [
    contactsTotal,
    contactsNew,
    contactsRead,
    contactsReplied,
    contactsArchived,
    dailySeries,
    weekdaySeries,
    postsTotal,
    postsPublished,
    postsByCategory,
    projectsTotal,
    projectsByStatus,
  ] = await Promise.all([
    ContactSubmission.countDocuments(),
    ContactSubmission.countDocuments({ status: 'new' }),
    ContactSubmission.countDocuments({ status: 'read' }),
    ContactSubmission.countDocuments({ status: 'replied' }),
    ContactSubmission.countDocuments({ status: 'archived' }),
    ContactSubmission.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]),
    ContactSubmission.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 },
        },
      },
    ]),
    BlogPost.countDocuments(),
    BlogPost.countDocuments({ status: 'published' }),
    BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
    Project.countDocuments(),
    Project.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
  ])

  const dailyMap = new Map(dailySeries.map((d) => [d._id, d.count]))
  const last30Days = lastNDays(30).map((date) => ({
    date,
    count: dailyMap.get(date) || 0,
  }))

  const weekdayMap = new Map(weekdaySeries.map((d) => [d._id, d.count]))
  const byDayOfWeek = DAY_LABELS.map((label, i) => ({
    day: label,
    count: weekdayMap.get(i + 1) || 0,
  }))

  const projectsStatusMap = new Map(projectsByStatus.map((p) => [p._id, p.count]))

  res.status(200).json({
    success: true,
    data: {
      contacts: {
        total: contactsTotal,
        new: contactsNew,
        read: contactsRead,
        replied: contactsReplied,
        archived: contactsArchived,
        last30Days,
        byDayOfWeek,
      },
      posts: {
        total: postsTotal,
        published: postsPublished,
        draft: postsTotal - postsPublished,
        byCategory: postsByCategory.map((c) => ({
          category: c._id || 'Uncategorized',
          count: c.count,
        })),
      },
      projects: {
        total: projectsTotal,
        planning: projectsStatusMap.get('planning') || 0,
        inProgress: projectsStatusMap.get('in-progress') || 0,
        review: projectsStatusMap.get('review') || 0,
        completed: projectsStatusMap.get('completed') || 0,
        onHold: projectsStatusMap.get('on-hold') || 0,
      },
      responseRate: contactsTotal > 0 ? Math.round((contactsReplied / contactsTotal) * 100) : 0,
    },
  })
})
