import { motion } from "framer-motion";


export default function Header() {
    return(
    <motion.div
        className="head-container"
        initial={{opacity:0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        >            <h1 className="header-title" style={{color: "aqua", textShadow:"4px 4px 4px black",}}><center>Crop Yeild Prediction</center></h1>
         </motion.div>
  
    );
}