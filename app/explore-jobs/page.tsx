import Link from 'next/link';

// Mock Data - Replace with database fetch later
const MOCK_JOBS = [
  { id: '1', title: 'Smart Contract Developer', company: 'Kika Crypto', location: 'Remote', salary: '$90k - $120k' },
  { id: '2', title: 'Financial Operations Analyst', company: 'Kika Money', location: 'Kampala, UG', salary: 'Negotiable' },
];

export default function ExploreJobsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Open Positions</h1>
      
      {/* Filters Row */}
      <div className="flex gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <input type="text" placeholder="Search titles..." className="border p-2 rounded w-full max-w-sm" />
        <select className="border p-2 rounded">
          <option>All Locations</option>
          <option>Remote</option>
          <option>Kampala</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-4">
        {MOCK_JOBS.map((job) => (
          <div key={job.id} className="border p-5 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center bg-white">
            <div>
              <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-gray-600 font-medium">{job.company} • {job.location}</p>
              <p className="text-sm text-gray-500 mt-1">{job.salary}</p>
            </div>
            <Link href={`/explore-jobs/${job.id}`} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
