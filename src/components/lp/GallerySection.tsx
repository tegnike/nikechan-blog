import { ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { fanArts } from "../../utils/fanArtsData";
import { shuffle } from "../../utils/galleryData";

export function GallerySection() {
  // ランダムに8件（4列 x 2行）を取得（ファンアート）
  const items = useMemo(() => shuffle([...fanArts]).slice(0, 8), []);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            アートギャラリー
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ニケちゃんのアートワークやファンアートをご紹介
          </p>
        </motion.div>

        {/* ファンアート（4列 x 2行、クリック/ホバー無し） */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {items.map(({ src, author }, index) => (
            <motion.div
              key={`${src}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={src}
                alt={`Fan art by ${author}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* ギャラリーへのリンク */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href="/gallery"
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <ImageIcon className="w-5 h-5" />
            <span>ギャラリーを見る</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
