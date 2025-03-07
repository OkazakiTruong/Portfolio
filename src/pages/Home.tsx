/* eslint-disable @typescript-eslint/no-explicit-any */
import "../assets/css/home.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EarthThree from "../components/EarthThree"
import { Button, Timeline, Card, Form, Input, Tag, FloatButton, Tooltip, message } from "antd"
import { faSquareJs, faHtml5, faCss3Alt, faSass, faReact, faVuejs, faNodeJs } from "@fortawesome/free-brands-svg-icons"
import { 
  DownloadOutlined, 
  MessageOutlined, 
  MailOutlined, 
  FacebookFilled, 
  PhoneOutlined, 
  GithubOutlined, 
  FacebookOutlined, 
  DoubleLeftOutlined, 
  PlusOutlined, 
  VerticalAlignTopOutlined, 
  EyeFilled, 
  CodeOutlined, 
  DatabaseOutlined, 
  SendOutlined 
} from "@ant-design/icons"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import TypingEffect from "../components/TypingText"
import { useTranslation } from 'react-i18next';
const { Meta } = Card




const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const sections = ["hello", "about", "projects", "contact"]
const settings = {
  dots: true, 
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
export default function Home() {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const [activeSection, setActiveSection] = useState(sections[0])
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const projects = [
    {
      title: t("grover"),
      description: t("groverTitle"),
      image: "/projects/image.png",
      link: "https://okazakitruong.github.io/BQTruong-F8-K2-Offline/Day11/exe01.html",
      front_link: "https://github.com/OkazakiTruong/BQTruong-F8-K2-Offline/tree/main/Day11",
      back_link: "#",
      tags: [{
        name: "HTML",
        color: "red"
      }, {
        name: "CSS",
        color: "blue"
      }]
    },
    {
      title: t("mindmap"),
      description: t("mindmapTitle"),
      image: "/projects/image2.png",
      link: "https://mindmap-navy.vercel.app/",
      front_link: "https://github.com/OkazakiTruong/BQTruong-F8-K2-Offline/tree/main/mindmap",
      back_link: "https://github.com/OkazakiTruong/mindmapDatabase",
      tags: [{
        name: "Next.js",
        color: "blue"
      }, {
        name: "Node.js",
        color: "green"
      },
      {
        name: "MongoDB",
        color: "green"
      }
    ]
    },
    {
      title: t("petpal"),
      description: t("petpalTitle"),
      image: "/projects/image3.png",
      link: "https://petpal-user.vercel.app/",
      front_link: "https://github.com/OkazakiTruong/petpals-user",
      back_link: "#",
      tags: [{
        name: "Next.js",
        color: "blue"
      }, 
      {
        name: "Antd",
        color: "blue"
      }, 
    ]
    },
    {
      title: t("portfolio"),
      description: t("portfolioTitle"),
      image: "/projects/image4.png",
      link: "https://okazakitruong.github.io/BQTruong-F8-K2-Offline/Day11/exe01.html",
      front_link: "https://okazakitruong.github.io/BQTruong-F8-K2-Offline/Day11/exe01.html",
      back_link: "#",
      tags: [{
        name: "ReactJs",
        color: "blue"
      }, 
      {
        name: "Antd",
        color: "blue"
      }, 
      {
        name: "Tailwind",
        color: "blue"
      }, 
      {
        name: "ThreeJs",
        color: "yellow"
      }, 
      {
        name: "i18n",
        color: "yellow"
      }, 
    ]
    },
    {
      title: t("bitis"),
      description: t("bitisTitle"),
      image: "/projects/image5.png",
      link: "#",
      front_link: "https://okazakitruong.github.io/BQTruong-F8-K2-Offline/Day11/exe01.html",
      back_link: "https://okazakitruong.github.io/BQTruong-F8-K2-Offline/Day11/exe01.html",
      tags: [{
        name: "VueJS",
        color: "green"
      }, 
      {
        name: "Tailwind",
        color: "blue"
      }, 
      {
        name: "Nodejs/Express",
        color: "green"
      }, 
      {
        name: "PostgreSQL",
        color: "blue"
      }, 
     
    ]
    }
  ]
  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = sections[0]

      sections.forEach(section => {
        const element = sectionRefs.current[section]
        if (!element) return

        const offsetTop = element.offsetTop
        if (pageYOffset >= offsetTop - 100) {
          newActiveSection = section
        }
      })

      setActiveSection(newActiveSection)
      
      setShowBackToTop(pageYOffset > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (section: string) => {
    const element = sectionRefs.current[section]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      
      e.preventDefault()
      isScrolling = true

      const currentSectionIndex = sections.indexOf(activeSection)
      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1)
      const nextSection = sections[nextIndex]

      scrollToSection(nextSection)

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 800)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [activeSection])


  const onFinish = async (values: any) => {
    try {
      console.log(values);
      const response = await fetch("https://script.google.com/macros/s/AKfycbzb571hKwzjPdHmURi904BewQm_SdNvwriVT_WokfGvY12EjFpWdlItheDlPIOR3AmfWg/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        mode: "no-cors", // Thêm dòng này
      });

      const data = await response.text();
      console.log("Response:", data);
      message.success(t('form.success'));
      form.resetFields(); // Reset form sau khi gửi thành công
      
    } catch (error) {
      console.error("Error:", error);
      message.error(t('form.error'));
    }
  };

  return (
    <div className="overflow-hidden">
      <button 
        onClick={() => setIsNavOpen(true)}  
        className={`fixed top-[40%] -translate-y-[50%] right-0 z-100 p-2 rounded-tl-xl rounded-bl-xl 
          bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg
          transition-all duration-300 hover:bg-white/20 cursor-pointer
          ${isNavOpen ? 'opacity-0 translate-x-full' : 'opacity-100 -translate-x-[-20%]'}`}
      >
        <DoubleLeftOutlined className={`text-sm transition-transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} />  
      </button>

      <nav className="fixed right-3 top-[40%] -translate-y-[50%] z-50">
        <div className={`mt-4 flex flex-col gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-lg
          transition-all duration-300 text-xs
          ${isNavOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
        >
          <button 
            onClick={() => setIsNavOpen(false)}  
            className="p-2 rounded-full text-blue-500 cursor-pointer"
          >
            <DoubleLeftOutlined className={`text-sm transition-transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} />
          </button>

          {sections.map(section => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`px-3 py-2 rounded-full transition-all duration-300 cursor-pointer
                ${activeSection === section 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-110' 
                  : 'bg-white/50 hover:bg-white/80 hover:scale-105'
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <section 
        className='section-hello bg-black min-h-screen'
        ref={(el) => (sectionRefs.current['hello'] = el)}
      >
        <div className="h-5 bg-black"></div>  
        <div className="max-w-[1440px] mx-auto px-5 min-h-[calc(100vh-1.25rem)] flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white md:ml-10 flex flex-col justify-center items-center md:items-start gap-5 order-2 md:order-1 py-10 md:py-0">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl  md:text-7xl lg:text-8xl font-semibold mb-5 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            >
              <TypingEffect text={t("hello")} speed={120} key={t("hello")}/>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative"
            >
              <p className="text-lg md:text-xl">
                {t("introduce")}<span className="text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-bold"> {t("name")}</span>
              </p>
              <p className="mt-3 text-gray-300 text-base md:text-lg">
                {t("role")}
                <br/>
                <span className="text-blue-400">Front-end</span> • <span className="text-green-400">Back-end</span> • <span className="text-purple-400">UI/UX</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex   gap-4 mt-6"
            >
              <Button 
                className="w-fit bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:opacity-90 text-base" 
                type="primary" 
                size="large" 
                icon={<DownloadOutlined/>}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/cv/cv.pdf'; // Đường dẫn tới file CV
                  link.download = 'BuiQuangTruong-CV.pdf'; // Tên file khi tải về
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                {t("downloadCV")}
              </Button>
              <Button 
                className="w-fit !bg-transparent !text-white hover:!text-blue-400 border-2 border-white hover:border-blue-400 text-base" 
                type="default" 
                size="large"
                onClick={() => {scrollToSection('contact')}}
              >
                {t("contactMe")}
              </Button>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-screen order-1 md:order-2">
            <EarthThree/>
          </div>
        </div>
      </section>
 
      <section 
        id="about" 
        className="py-10 bg-gradient-to-b from-white via-blue-50 to-white dark:from-black dark:via-blue-950 dark:to-black min-h-screen flex flex-col justify-center"
        ref={(el) => (sectionRefs.current['about'] = el)}
      >
        <motion.h2 
          initial={{y: 100, opacity: 0}} 
          whileInView={{y: 0, opacity: 1}} 
          transition={{
            y: {delay: 0.12, duration: 0.4},
            opacity: {delay: 0.12, duration: 0.6}
          }}
          viewport={{once: true}} 
          className="text-3xl font-extrabold text-center mb-7"
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-gradient">
            {t("about")}
          </span>
          <motion.div
            initial={{width: 0}}
            whileInView={{width: "10%"}}
            transition={{delay: 0.5, duration: 0.8}}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mt-2 mx-auto"
          />
        </motion.h2>

        <div className="max-w-[1440px] mx-auto px-5 grid grid-cols-1 md:grid-cols-12 gap-5">
          <motion.div 
            initial={{x:-150}} 
            whileInView={{x:0}} 
            viewport={{once: true}} 
            transition={{delay:0.12, duration:0.4}} 
            className="col-span-1 md:col-span-4 p-5 border border-blue-300 dark:border-blue-700 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="mb-5 font-bold text-xl text-blue-500">{t("experience")}</h2>
            <Timeline
              mode="left"
              items={[
                {
                  label: '01/08/2024 - 01/11/2024',
                  children: (
                    <>
                      <h3 className="text-xl font-bold text-orange-500">DRAPHONY</h3>
                      <p className="font-bold dark:text-gray-200">{t("draphony")}</p> 
                      <p className="dark:text-gray-300">{t("mainWork")}</p>
                      <p className="dark:text-gray-300">{t("draphonyWork1")}</p>
                      <p className="dark:text-gray-300">{t("draphonyWork2")}</p>
                    </>
                  ),
                },
                {
                  label: '01/11/2024 - 10/02/2024',
                  children: (
                    <>
                      <h3 className="text-xl font-bold dark:text-gray-200">VC<span className="text-orange-600">C</span>ORP</h3>
                      <p className="font-bold dark:text-gray-200">{t("vccorp")}</p> 
                      <p className="dark:text-gray-300">{t("mainWork")}</p>
                      <p className="dark:text-gray-300">{t("vccorpWork1")}</p>
                      <p className="dark:text-gray-300">{t("vccorpWork2")}</p>
                    </>
                  ),
                },
              ]}
            />
          </motion.div>

          <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
            <motion.div 
              initial={{y:-150}} 
              whileInView={{y:0}} 
              viewport={{once: true}} 
              transition={{delay:0.12, duration:0.4}} 
              className="col-span-1 md:col-span-12 p-5 border border-blue-300 dark:border-blue-700 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-2xl text-blue-500 mb-3">{t("about2")}</h3>
              <p className="dark:text-gray-300">
                {t("aboutMe")}
              </p>
              
              <div className="mt-4">
                <p className="font-semibold mb-2 dark:text-gray-200">{t("technologies")}</p>
                <div className="flex gap-3 flex-wrap">
                  <FontAwesomeIcon icon={faHtml5} className="text-orange-500 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faSass} className="text-red-400 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faSquareJs} className="text-yellow-400 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faReact} className="text-blue-500 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faVuejs} className="text-green-500 text-2xl hover:scale-110 transition-transform"/>
                  <FontAwesomeIcon icon={faNodeJs} className="text-green-500 text-2xl hover:scale-110 transition-transform"/>
                </div>
              </div>

              <div className="flex gap-3 mt-5 flex-wrap">
                <p className="font-semibold dark:text-gray-200">{t("contact2")}</p>
                <Button icon={<MessageOutlined />} className="hover:scale-105 transition-transform dark:text-white dark:bg-gray-800">Zalo</Button>
                <Button icon={<PhoneOutlined />} className="hover:scale-105 transition-transform dark:text-white dark:bg-gray-800" href="tel:0987654321">Phone</Button>
                <Button icon={<MailOutlined/>} className="hover:scale-105 transition-transform dark:text-white dark:bg-gray-800"    href="mailto:buiquangtruong1105@gmail.com">Email</Button> 
                <Button icon={<FacebookFilled/>} className="hover:scale-105 transition-transform dark:text-white dark:bg-gray-800">Facebook</Button>
              </div>  
            </motion.div>

            <motion.div 
              initial={{y:150}} 
              whileInView={{y:0}} 
              viewport={{once: true}} 
              transition={{delay:0.12, duration:0.4}} 
              className="col-span-1 md:col-span-6 p-5 border border-blue-300 dark:border-blue-700 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-500 mb-4">{t("education")}</h3>
              <Timeline
                items={[
                  {
                    children: (
                      <div className="hover:translate-x-2 transition-transform">
                        <p className="dark:text-gray-300">09/2017 - 09/2020</p>
                        <p className="font-bold text-blue-500">THPT Quất Lâm</p>
                      </div>
                    ),
                  },
                  {
                    children: (
                      <div className="hover:translate-x-2 transition-transform">
                        <p className="dark:text-gray-300">10/2020 - 03/2025</p>
                        <p className="font-bold text-blue-500">{t("hou")}</p>
                        <p className="dark:text-gray-300">GPA: 2.91</p>
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>

            <motion.div 
              initial={{x:150}} 
              whileInView={{x:0}} 
              viewport={{once: true}} 
              transition={{delay:0.12, duration:0.4}} 
              className="col-span-1 md:col-span-6 p-5 border border-blue-300 dark:border-blue-700 rounded-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-500 mb-4">{t("certificates")}</h3>
              <Timeline
                items={[
                  {
                    children: (
                      <div className="hover:translate-x-2 transition-transform">
                        <p className="dark:text-gray-300">10/2021 - 09/2022</p>
                        <p className="font-bold text-orange-500">{t("certificates1")}</p>
                        <p className="dark:text-gray-300">CyberSoft Academy</p>
                      </div>
                    ),
                  },
                  {
                    children: (
                      <div className="hover:translate-x-2 transition-transform">
                        <p className="dark:text-gray-300">07/2023 - 03/2024</p>
                        <p className="font-bold text-orange-500">Khóa học Fullstack NextJS & NodeJS</p>
                        <p className="dark:text-gray-300">F8 Education</p>
                      </div>
                    ),
                  },
                ]}
              />
            </motion.div>
          </div>
        </div> 
      </section>

      <section 
        className="py-16 bg-gradient-to-b from-white via-blue-100 to-white dark:from-black dark:via-blue-950 dark:to-black min-h-screen flex flex-col justify-center"
        id="projects"
        ref={(el) => (sectionRefs.current['projects'] = el)}
      >
        <motion.h2 
          initial={{y: 100, opacity: 0}} 
          whileInView={{y: 0, opacity: 1}} 
          transition={{
            y: {delay: 0.12, duration: 0.4},
            opacity: {delay: 0.12, duration: 0.6}
          }}
          viewport={{once: true}} 
          className="text-3xl font-extrabold text-center mb-7"
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-gradient">
            {t("projects")}
          </span>
          <motion.div
            initial={{width: 0}}
            whileInView={{width: "15%"}}
            transition={{delay: 0.5, duration: 0.8}}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mt-2 mx-auto"
          />
        </motion.h2>

        <div className="max-w-[1440px] mx-auto px-5 my-10">
          <Slider {...settings} className="project-slider">
              {projects.map((project, index)=>{
                return (
                  <div className="px-2" key={index}>
                  <Card
                    hoverable
                    actions={[
                      <Tooltip title={project.link!=="#" ? "Xem sản phẩm" : "Sản phẩm đang phát triển"}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <EyeFilled key="edit"/>
                        </a>
                      </Tooltip>,
                      <Tooltip title={project.front_link!=="#" ? "Xem source code front-end" : "Hiện không có source code front-end"}>
                        <a href={project.front_link} target="_blank" rel="noopener noreferrer">
                          <CodeOutlined key="setting" />
                        </a>
                      </Tooltip>,
                      <Tooltip title={project.back_link!=="#" ? "Xem source code back-end" : "Hiện không có source code back-end"}>
                        <a href={project.back_link} target="_blank" rel="noopener noreferrer">
                          <DatabaseOutlined key="setting" />
                        </a>
                      </Tooltip>
                    ]}
                    cover={<img alt="Portfolio Website" className="h-36 sm:h-44 md:h-52 w-full object-cover hover:scale-105 transition-transform" src={project.image} />}
                    className="backdrop-blur-sm bg-white/90 dark:bg-black/90 dark:text-white shadow-lg hover:shadow-xl transition-all max-w-[86vw] md:max-w-full"

                  >
                    <Meta 
                      title={<span className="text-lg sm:text-xl dark:text-white">{project.title}</span>}
                      description={
                        <div className="space-y-2">
                          <p className="text-sm sm:text-base dark:text-gray-300">{project.description}</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {project.tags.map((tag, index)=>{
                              return (
                                <Tag className="text-xs sm:text-sm" color={tag.color} key={index}>{tag.name}</Tag>
                              )
                            })}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
                )
              })}
          </Slider>
        </div>
      </section>

      <section 
        className="relative bg-gradient-to-b from-white via-blue-50 to-white dark:from-black dark:via-blue-950 dark:to-black py-10 min-h-[calc(100vh-104px)] flex flex-col justify-center"
        id="contact"
        ref={(el) => (sectionRefs.current['contact'] = el)}
      >
        <motion.h2 
          initial={{y: 100, opacity: 0}} 
          whileInView={{y: 0, opacity: 1}} 
          transition={{
            y: {delay: 0.12, duration: 0.4},
            opacity: {delay: 0.12, duration: 0.6}
          }}
          viewport={{once: true}} 
          className="text-3xl font-extrabold text-center mb-7"
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-gradient">
            {t("contact")}
          </span>
          <motion.div
            initial={{width: 0}}
            whileInView={{width: "10%"}}
            transition={{delay: 0.5, duration: 0.8}}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mt-2 mx-auto"
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1440px] w-full mx-auto px-5 gap-x-5 md:gap-x-20 my-10">
          <motion.div
            initial={{x: -100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
            className="w-full"
          >
            <Form 
              form={form}
              {...layout} 
              className="dark:text-white"
              onFinish={onFinish}
            >
              <Form.Item 
                name="name" 
                label={<span className="dark:text-white">{t("form.name")}</span>} 
                rules={[{ required: true, message: t('form.nameRequired') }]}
              >
                <Input className="hover:border-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
              </Form.Item>
              
              <Form.Item 
                name="email" 
                label={<span className="dark:text-white">{t("form.email")}</span>} 
                rules={[
                  { type: 'email', message: t('form.emailInvalid') }, 
                  { required: true, message: t('form.emailRequired') }
                ]}
              >
                <Input className="hover:border-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
              </Form.Item>
              
              <Form.Item 
                name="phone" 
                label={<span className="dark:text-white">{t("form.phone")}</span>} 
                rules={[{ pattern: /^[0-9]{10}$/, message: t('form.phoneInvalid') }]}
              >
                <Input className="hover:border-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
              </Form.Item>
              
              <Form.Item 
                name="message" 
                label={<span className="dark:text-white">{t("form.message")}</span>} 
                rules={[{ required: true, message: t('form.messageRequired') }]}
              >
                <Input.TextArea rows={4} className="hover:border-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
              </Form.Item>
              
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity"
                >
                  {t("form.send")}
                </Button>
              </Form.Item>
            </Form>
          </motion.div>    

          <motion.div
            initial={{x: 100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
            className="mt-10 md:mt-0"
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-6">{t("contactInfo")}</h2>   
            <div className="flex flex-col gap-5">
              <motion.a 
                href="mailto:buiquangtruong1105@gmail.com"
                className="flex items-center gap-3 hover:translate-x-2 transition-all hover:text-blue-500 dark:text-white"
                whileHover={{scale: 1.02}}
              >
                <MailOutlined className="text-xl text-blue-500" />
                <span>buiquangtruong1105@gmail.com</span>
              </motion.a>   
              
              <motion.a 
                href="tel:0987654321"
                className="flex items-center gap-3 hover:translate-x-2 transition-all hover:text-blue-500 dark:text-white"
                whileHover={{scale: 1.02}}
              >
                <PhoneOutlined className="text-xl text-blue-500" />
                <span>0977354956</span>
              </motion.a>   
              
              <motion.a 
                href="https://facebook.com/truongbui2002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:translate-x-2 transition-all hover:text-blue-500 dark:text-white"
                whileHover={{scale: 1.02}}
              >
                <FacebookOutlined className="text-xl text-blue-500" />
                <span>facebook.com/truongbui2002</span>
              </motion.a>   
              
              <motion.a 
                href="https://github.com/OkazakiTruong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:translate-x-2 transition-all hover:text-blue-500 dark:text-white"
                whileHover={{scale: 1.02}}
              >
                <GithubOutlined className="text-xl text-blue-500" />
                <span>github.com/OkazakiTruong</span>
              </motion.a>   
            </div>  
          </motion.div>  
        </div>
      </section>
      <Tooltip title="Lên đầu trang" placement="top">
          <FloatButton 
            icon={<VerticalAlignTopOutlined />}
            className={`hover:scale-110 transition-all duration-300 ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ bottom: 100 }}
          />
        </Tooltip>
      <FloatButton.Group
        trigger="click"
        style={{
          right: 24,
          '--ant-primary-color': '#4F46E5',
          '--ant-primary-color-hover': '#6366F1'
        } as React.CSSProperties}
        placement="left"
        icon={<PlusOutlined className="animate-spin-slow" />}
      >
        <Tooltip title="Zalo" placement="top">
          <FloatButton 
            icon={<MessageOutlined />}
            className="hover:scale-110 transition-transform"
            onClick={() => window.open('https://m.me/truongbui2002')}
          />
        </Tooltip>
        <Tooltip title={t("makeContact.phone")} placement="top">
          <FloatButton 
            icon={<PhoneOutlined />}
            className="hover:scale-110 transition-transform"
            onClick={() => window.open('tel:0987654321')}
          />
        </Tooltip>
        <Tooltip title={t("makeContact.email")} placement="top">
          <FloatButton 
            icon={<MailOutlined />}
            className="hover:scale-110 transition-transform"
            onClick={() => window.open('mailto:truongbui2002@gmail.com')}
          />
        </Tooltip>
        <Tooltip title="Facebook" placement="top">
          <FloatButton 
            icon={<FacebookOutlined />}
            className="hover:scale-110 transition-transform"
            onClick={() => window.open('https://facebook.com/truongbui2002')}
          />
        </Tooltip>
        <Tooltip title="Github" placement="top">
          <FloatButton 
            icon={<GithubOutlined />}
            className="hover:scale-110 transition-transform"
            onClick={() => window.open('https://github.com/truongbui2002')}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  )
}
