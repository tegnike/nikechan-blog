import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <span className="text-xs font-semibold text-white">V</span>
            </div>
            <span className="font-medium">Luna Chan</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Fan Art Guidelines
            </a>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Luna Chan. All rights reserved.</p>
          <p className="mt-1">このサイトは架空のVTuberのデモサイトです。</p>
        </div>
      </div>
    </footer>
  );
}