import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, Star, Gamepad2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function ProfileSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="about">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Profile
            </h2>
            <Sparkles className="w-8 h-8 text-pink-500" />
          </motion.div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nike Chanについてもっと知ってください
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: Star,
              title: "キャラクター設定",
              content: [
                { label: "種族", value: "月の魔法使い" },
                { label: "年齢", value: "永遠の17歳" },
                { label: "特徴", value: "月光で魔法を使う" },
                { label: "好きなもの", value: "お菓子作り、星空観察" },
              ],
              gradient: "from-yellow-400 to-orange-500",
              bgGradient: "from-yellow-50 to-orange-50"
            },
            {
              icon: Gamepad2,
              title: "配信スタイル",
              badges: ["ゲーム実況", "雑談", "歌枠", "お絵描き"],
              description: "主にインディーゲームやホラーゲームを配信しています。視聴者との交流を大切にした温かい配信を心がけています。",
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-50 to-pink-50"
            },
            {
              icon: Calendar,
              title: "配信スケジュール",
              schedule: [
                { time: "平日", hours: "20:00 - 23:00" },
                { time: "土日", hours: "15:00 - 18:00" },
              ],
              note: "※配信時間は変更になる場合があります",
              gradient: "from-blue-500 to-purple-500",
              bgGradient: "from-blue-50 to-purple-50"
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full/70 backdrop-blur-sm border-0 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50 rounded-lg`}></div>
                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="flex items-center text-xl">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} mr-4`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent font-bold">
                      {item.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  {item.content && (
                    <div className="space-y-3">
                      {item.content.map((detail, i) => (
                        <motion.div 
                          key={i}
                          className="flex justify-between items-center p-3/50 rounded-lg backdrop-blur-sm"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="font-semibold text-gray-700">{detail.label}:</span>
                          <span className="text-gray-600">{detail.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {item.badges && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.badges.map((badge, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200 px-3 py-1"
                            >
                              {badge}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed/50 p-4 rounded-lg backdrop-blur-sm">
                        {item.description}
                      </p>
                    </div>
                  )}
                  
                  {item.schedule && (
                    <div className="space-y-4">
                      {item.schedule.map((sch, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center justify-between p-3/50 rounded-lg backdrop-blur-sm"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-3 text-blue-500" />
                            <span className="font-semibold">{sch.time}:</span>
                          </div>
                          <span className="text-gray-600">{sch.hours}</span>
                        </motion.div>
                      ))}
                      <p className="text-xs text-gray-500/50 p-3 rounded-lg backdrop-blur-sm">
                        {item.note}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}