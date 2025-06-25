import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion'; // Optional: if using Framer Motion

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      {/* Sun Icon with scale/rotate animation */}
      <motion.div
        key={theme === 'light' ? 'sun-active' : 'sun-inactive'}
        animate={{ scale: theme === 'light' ? 1.3 : 1, rotate: theme === 'light' ? 20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Sun
          className={`h-5 w-5 transition-colors duration-300 ${
            theme === 'light' ? 'text-yellow-400' : 'text-muted-foreground'
          }`}
        />
      </motion.div>

      {/* Switch Toggle */}
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-slate-800 data-[state=unchecked]:bg-slate-200"
      />

      {/* Moon Icon with bounce effect */}
      <motion.div
        key={theme === 'dark' ? 'moon-active' : 'moon-inactive'}
        animate={{ scale: theme === 'dark' ? 1.3 : 1, rotate: theme === 'dark' ? -20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Moon
          className={`h-5 w-5 transition-colors duration-300 ${
            theme === 'dark' ? 'text-purple-400' : 'text-muted-foreground'
          }`}
        />
      </motion.div>
    </div>
  );
};
