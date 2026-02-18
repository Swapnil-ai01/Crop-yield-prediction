import { Button } from "./ui/button"; 
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import "./homepage.css";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const navigate = useNavigate();
  return (
    <div className="container">
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome 
      </motion.h1>
      
      <Card className="w-full max-w-lg p-4 shadow-lg rounded-2xl bg-white">
        <CardContent className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            Predict Your Crop Yield
          </p>
          <Button className="button" onClick={() => navigate("/newpage")}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
