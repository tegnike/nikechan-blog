import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl/80 border-b border-purple-200/50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
      <div className="container relative flex h-20 items-center justify-between px-6 lg:px-8">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 shadow-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Nike Chan
            </span>
            <div className="text-xs text-muted-foreground">VTuber & Streamer</div>
          </div>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {["About", "Gallery", "Schedule"].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative px-4 py-2 font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <span className="relative z-10">{item}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg opacity-0"
                whileHover={{ opacity: 1, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </nav>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mr-2 md:mr-0"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden/50 border-purple-200 hover:bg-purple-50"
          >
            Menu
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}