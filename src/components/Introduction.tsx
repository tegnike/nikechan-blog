export const Introduction = () => {
  return (
    <>
      <div className="pt-12 pb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white">
          Hello, I'm Nike.
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
          <div className="max-w-3xl mx-auto">
            <p className="text-base md:text-lg lg:text-l text-white mb-6 leading-relaxed">
              こんにちは、ニケです。<br className="md:hidden" />
              このWebサイトは、以下の用途で使用されます。
            </p>
            <ul className="text-base md:text-lg lg:text-l text-white list-none space-y-4 mb-6">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-blue-400 rounded-full mr-2 md:mr-3"></span>
                私のポートフォリオ
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-blue-400 rounded-full mr-2 md:mr-3"></span>
                個人開発のログ置き場
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-blue-400 rounded-full mr-2 md:mr-3"></span>
                イラストギャラリー
              </li>
            </ul>
            <p className="text-base md:text-lg lg:text-l text-white leading-relaxed border-t border-gray-700 pt-6">
              どうぞお好きなページをご覧ください。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
