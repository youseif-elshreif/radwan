const CourseSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Skeleton */}
            <div className="aspect-video bg-gray-300 rounded-2xl"></div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="w-20 h-6 bg-gray-300 rounded"></div>
              <div className="w-full h-10 bg-gray-300 rounded"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="bg-gray-200 rounded-xl p-6">
                <div className="w-32 h-8 bg-gray-300 rounded mb-4"></div>
                <div className="w-full h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description Skeleton */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-48 h-6 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-32 h-6 bg-gray-300 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="w-16 h-3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-24 h-6 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="w-24 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
