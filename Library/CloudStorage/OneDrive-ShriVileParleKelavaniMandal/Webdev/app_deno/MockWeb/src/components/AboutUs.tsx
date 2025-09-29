import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Palette, Code, BarChart2, Users, Mic } from 'lucide-react';

const teamMembers = [
  {
    name: 'Atharva Deo',
    role: 'FrontEnd Developer',
    description: 'Crafting intuitive and engaging user experiences on websites.',
    tags: [
      { icon: <MapPin size={16} />, label: 'Mumbai' },
      { icon: <Palette size={16} />, label: 'FrontEnd Developer' },
      { icon: <Palette size={16} />, label: 'React' },
    ],
  },
  {
    name: 'Bhavik Seth',
    role: 'Backend Developer',
    description: 'Building fast, responsive, and beautiful web applications from DJSCE.',
     tags: [
      { icon: <MapPin size={16} />, label: 'Mumbai' },
      { icon: <Code size={16} />, label: 'Backend Developer' },
      { icon: <Code size={16} />, label: 'Node' },
    ],
  },
  {
    name: 'Dravvya Jain',
    role: 'Data Scientist',
    description: 'Uncovering insights and telling stories with data in India.',
     tags: [
      { icon: <MapPin size={16} />, label: 'Mumbai' },
      { icon: <BarChart2 size={16} />, label: 'Data Science' },
      { icon: <BarChart2 size={16} />, label: 'Python & R' },
    ],
  },
  {
    name: 'Akshat Bhalani',
    role: 'ML Engineer',
    description: 'Understanding machine needs and advocating for human computer interaction in India.',
    tags: [
      { icon: <MapPin size={16} />, label: 'Mumbai' },
      { icon: <Users size={16} />, label: 'ML Ops' },
      { icon: <Mic size={16} />, label: 'GenAI' },
    ],
  },
];

const AboutUs: React.FC = () => {
    const cardVariants = {
        offscreen: {
            y: 20,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5
            }
        }
    };

  return (
    <section id="about" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          <h2 style={{ fontFamily: 'Satoshi, sans-serif' }} className="text-center text-4xl font-bold leading-8 text-white sm:text-5xl tracking-tight">About Our Team</h2>
          <p style={{ fontFamily: 'Satoshi, sans-serif' }} className="mt-6 text-center text-lg leading-8 text-neutral-300 tracking-wide">
            We are a collective of passionate creators, developers, and strategists dedicated to pushing the boundaries of digital interaction.
          </p>
        </motion.div>
        
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {teamMembers.map((member, index) => (
             <motion.div
                key={member.name}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.1, delay: index * 0.1 }}
                variants={cardVariants}
                className="col-span-1 row-span-1 bg-white/5 rounded-xl p-8 flex flex-col justify-between backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-navbar-glow hover:bg-white/10"
              >
              <div>
                <h3 style={{fontFamily: 'Satoshi, sans-serif'}} className="text-3xl font-bold text-white tracking-tight">{member.name}</h3>
                <p className="mt-2 text-neutral-300 tracking-wide">{member.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {member.tags.map((tag) => (
                    <div key={tag.label} className="flex items-center gap-2 bg-black/20 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium tracking-wide backdrop-blur-sm">
                        {tag.icon}
                        {tag.label}
                    </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;