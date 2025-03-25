import { Instagram, Github, Linkedin } from "../assets/icons";

export const Footer = () => {
     return (
          <footer className="p-3 bg-gray-900 text-white grid mt-10 absolute left-0 right-0 bottom-0 md:bottom-3 md:rounded-md">
               <div className="container mx-auto text-center">
                    <h3 className="text-xl mb-4">ngajiquran.vercel.app</h3>
                    <div className="flex justify-center space-x-4 mt-2 ">
                         <a href="https://www.instagram.com/farelghazalii?igsh=MTJuMDN2OWhiOWg3aA==" target="_blank" rel="noopener noreferrer" className="text-white">
                              <Instagram></Instagram>
                         </a>
                         <a href="https://github.com/GithubFarelAlghazali" target="_blank" rel="noopener noreferrer" className="text-white">
                              <Github></Github>
                         </a>
                         <a href="https://www.linkedin.com/in/muhammad-farel-alghazali-8a5ab131a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white">
                              <Linkedin></Linkedin>
                         </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                         Copyright 2025 &copy; <span id="year"></span> Create by Farelghazali
                    </p>
               </div>
          </footer>
     );
};
