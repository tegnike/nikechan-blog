import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, ArrowRight, Megaphone } from "lucide-react";

export function NewsSection() {
  const news = [
    {
      id: 1,
      type: "配信予定",
      title: "【ホラーゲーム】深夜の怖いゲーム配信",
      date: "2024-08-05",
      time: "22:00",
      badge: "予定",
      badgeColor: "bg-blue-500",
    },
    {
      id: 2,
      type: "お知らせ",
      title: "新しいグッズが発売決定！",
      date: "2024-08-04",
      badge: "重要",
      badgeColor: "bg-red-500",
    },
    {
      id: 3,
      type: "配信予定",
      title: "視聴者参加型ゲーム大会",
      date: "2024-08-06",
      time: "20:00",
      badge: "参加型",
      badgeColor: "bg-green-500",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest News</h2>
          <p className="text-muted-foreground">
            最新の配信予定とお知らせをチェック
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.type === "配信予定" ? (
                      <Calendar className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Megaphone className="w-4 h-4 text-orange-500" />
                    )}
                    <span className="text-sm text-muted-foreground">{item.type}</span>
                  </div>
                  <Badge className={`${item.badgeColor} text-white`}>
                    {item.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{item.date}</span>
                  {item.time && <span>{item.time}〜</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            もっと見る
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}