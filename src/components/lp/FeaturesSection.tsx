import { Zap, Music, Gamepad2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function FeaturesSection() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const features = [
    {
      icon: Gamepad2,
      title: "ゲーム実況",
      description: "ホラーゲームからインディーゲームまで幅広く配信",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Music,
      title: "歌枠配信",
      description: "美しい歌声で心温まるひとときを",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center px-4 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric Decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      
      <div className="container relative z-10 mx-auto">
        <div className="max-w-3xl">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Special Features
                  </h2>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Nike Chanならではの魅力的なコンテンツ
                </p>
              </motion.div>

              <motion.div 
                className="grid sm:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="p-6/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient.replace('from-', 'from-').replace('to-', 'to-')} opacity-10 rounded-2xl`}></div>
                        
                        <div className="relative z-10">
                          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {feature.title}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center space-x-4 mb-4">
                  {['💜', '🌙', '✨'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="text-3xl"
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  一緒に特別な時間を過ごしませんか？
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  毎回の配信で新しい発見と笑顔をお届けします
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}