import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm border rounded-xl mt-10">
      <Link href="/explore-jobs" className="text-blue-600 hover:underline text-sm">← Back to all jobs</Link>
      
      <div className="mt-4 border-b pb-4">
        <h1 className="text-3xl font-bold">Job Profile Reference #{params.id}</h1>
        <p className="text-lg text-gray-600 mt-1">Kika Ecosystem Infrastructure Development</p>
      </div>

      <div className="py-6 space-y-4 text-gray-700">
        <h3 className="text-xl font-semibold text-gray-900">Role Overview</h3>
        <p>We are seeking an experienced specialist to deploy, monitor, and upgrade core operational application architectures across our global platforms.</p>
        
        <h3 className="text-xl font-semibold text-gray-900">Requirements</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>2+ years experience building web applications.</li>
          <li>Familiarity with Next.js, TailwindCSS, and API management tools.</li>
        </ul>
      </div>

      <div className="pt-4 border-t">
        <Link href={`/explore-jobs/${params.id}/apply`} className="block w-full text-center bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700">
          Apply Now For This Position
        </Link>
      </div>
    </div>
  );
}
