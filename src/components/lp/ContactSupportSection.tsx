import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, Coffee, Gift, MessageSquare } from "lucide-react";

export function ContactSupportSection() {
  const supportOptions = [
    {
      icon: Coffee,
      title: "Ko-fi",
      description: "コーヒー一杯分の応援",
      buttonText: "応援する",
      color: "text-orange-500",
    },
    {
      icon: Gift,
      title: "Amazon欲しいものリスト",
      description: "プレゼントを贈る",
      buttonText: "リストを見る",
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      title: "スーパーチャット",
      description: "配信中にメッセージ",
      buttonText: "配信を見る",
      color: "text-green-500",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact & Support</h2>
          <p className="text-muted-foreground">
            お問い合わせと応援について
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-500" />
                お問い合わせ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">ファンレター</h4>
                  <p className="text-sm text-muted-foreground">
                    fanmail@lunachan.example.com<br />
                    ※お返事は配信内でさせていただく場合があります
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">ビジネス関連</h4>
                  <p className="text-sm text-muted-foreground">
                    business@lunachan.example.com<br />
                    ※案件・コラボのご相談はこちら
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  お返事までお時間をいただく場合があります。
                  緊急の場合はTwitterのDMをご利用ください。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>応援・サポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`w-5 h-5 ${option.color}`} />
                        <div>
                          <p className="font-medium">{option.title}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {option.buttonText}
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  いつもご視聴いただき、ありがとうございます！<br />
                  皆様の応援が配信活動の励みになっています✨
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}