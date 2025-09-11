import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, Palette, Hash, ExternalLink } from "lucide-react";

export function FanArtSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fan Art & Guidelines</h2>
          <p className="text-muted-foreground">
            ファンアートを描いてくださる皆様へ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-500" />
                ファンアート歓迎
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Luna Chanのファンアートはいつでも大歓迎です！みなさんの素敵な作品を楽しみにしています。
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">二次創作OK</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">非営利利用OK</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm">SNS投稿OK</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium mb-2">推奨ハッシュタグ:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Hash className="w-3 h-3 mr-1" />
                    LunaChanArt
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Hash className="w-3 h-3 mr-1" />
                    月の魔法使い
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-blue-500" />
                詳細ガイドライン
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                より詳しいガイドラインは専用ページでご確認いただけます。
              </p>
              
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 商用利用について</li>
                <li>• 禁止事項</li>
                <li>• 二次創作の範囲</li>
                <li>• 権利関係について</li>
              </ul>

              <Button className="w-full">
                詳細ガイドラインを見る
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}