/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch, Button, Dropdown } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import "../assets/css/header.css"
import WaveText from './WaveText';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';



export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState<string>(localStorage.getItem("language") || "vi");
  const { i18n } = useTranslation();
  
  const items = [
    { label: (<Button type='text' className='text-white' icon={<img src="/icon/vietnam.png" className='w-5 h-5 rounded-full'/>} onClick={() => {
      setCurrentLanguage("vi"); 
    }}>Vie</Button>), key: 'vi' },
    { label: (<Button type='text' className='text-white' icon={<img src="/icon/united-states.png" className='w-5 h-5 rounded-full'/>} onClick={() => {
      setCurrentLanguage("en");
    }}>Eng</Button>), key: 'en' },
  ];
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage, i18n]);


  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 left-0 right-0 z-10 backdrop-blur-md bg-white dark:bg-black/80 shadow-lg"
    >
      <div className='max-w-[1440px] flex items-center justify-between w-full mx-auto px-3 sm:px-5 min-h-14 sm:min-h-16'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="scale-75 sm:scale-100"
        >
          <WaveText text="Bùi Quang Trưởng" />
        </motion.div>
        
        {/* Desktop & Mobile Menu */}
        <motion.div 
          className='flex items-center gap-2 sm:gap-4'
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Dropdown 
            menu={{ items }} 
            placement="bottomLeft" 
          >
            <Button className='scale-90 sm:scale-100 hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-400 to-purple-500 text-white border-none hover:opacity-90'>
                {currentLanguage === "vi" ? "Vie" : "Eng"}
            </Button>
          </Dropdown>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="scale-90 sm:scale-100"
          >
            <Switch
              unCheckedChildren={<SunOutlined className="text-yellow-400" />}
              checkedChildren={<MoonOutlined className="text-blue-400" />}
              defaultChecked
              checked={darkMode} onChange={toggleDarkMode}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 
                       dark:from-blue-400 dark:to-purple-500 dark:hover:from-blue-500 dark:hover:to-purple-600
                       transition-all duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
