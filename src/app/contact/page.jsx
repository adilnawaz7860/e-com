// "use client"
// import { motion } from 'framer-motion';
// import { Server, Cpu, ShieldCheck, Clock, Headphones, Truck } from 'lucide-react';

// export default function AboutPage() {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
//     >
//       {/* Hero Section */}
//       <div className="text-center mb-16">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">About IT Solutions</h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Your premier destination for professional-grade computer hardware and IT accessories since 2015.
//         </p>
//       </div>

//       {/* Two Column Layout - Story + Stats */}
//       <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
//           <p className="text-gray-600 mb-4">
//             At IT Solutions, we empower businesses and individuals with reliable, high-performance technology 
//             that drives productivity and innovation.
//           </p>
//           <p className="text-gray-600 mb-6">
//             Founded by IT professionals, we understand the critical role quality hardware plays in your daily 
//             operations and digital transformation.
//           </p>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-2xl font-bold text-cyan-600">5K+</p>
//               <p className="text-sm text-gray-600">Satisfied Clients</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-2xl font-bold text-cyan-600">300+</p>
//               <p className="text-sm text-gray-600">Quality Products</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
//             <Server className="w-10 h-10 text-cyan-600 mb-3" />
//             <h3 className="font-semibold mb-2">Enterprise Hardware</h3>
//             <p className="text-sm text-gray-600">Servers, storage & networking</p>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
//             <Cpu className="w-10 h-10 text-cyan-600 mb-3" />
//             <h3 className="font-semibold mb-2">Components</h3>
//             <p className="text-sm text-gray-600">CPUs, GPUs & upgrades</p>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
//             <Headphones className="w-10 h-10 text-cyan-600 mb-3" />
//             <h3 className="font-semibold mb-2">Peripherals</h3>
//             <p className="text-sm text-gray-600">Keyboards, mice & audio</p>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center text-center">
//             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
//               <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
//               <line x1="8" y1="21" x2="16" y2="21"></line>
//               <line x1="12" y1="17" x2="12" y2="21"></line>
//             </svg>
//             <h3 className="font-semibold mb-2">Workstations</h3>
//             <p className="text-sm text-gray-600">Monitors & docking stations</p>
//           </div>
//         </div>
//       </div>

//       {/* Value Propositions */}
//       <div className="bg-gray-50 rounded-xl p-8 mb-16">
//         <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why IT Solutions?</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="text-center">
//             <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
//               <ShieldCheck className="w-8 h-8 text-cyan-600" />
//             </div>
//             <h3 className="font-semibold mb-2">Enterprise-Grade Quality</h3>
//             <p className="text-sm text-gray-600">All products meet strict IT department standards</p>
//           </div>
//           <div className="text-center">
//             <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
//               <Clock className="w-8 h-8 text-cyan-600" />
//             </div>
//             <h3 className="font-semibold mb-2">24/7 Support</h3>
//             <p className="text-sm text-gray-600">IT-certified technicians available round-the-clock</p>
//           </div>
//           <div className="text-center">
//             <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm">
//               <Truck className="w-8 h-8 text-cyan-600" />
//             </div>
//             <h3 className="font-semibold mb-2">Bulk Order Solutions</h3>
//             <p className="text-sm text-gray-600">Specialized procurement for businesses</p>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="text-center bg-cyan-50 rounded-xl p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Upgrade Your IT Infrastructure?</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-6">
//           Our specialists can help you build the perfect technology stack for your needs.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
//             Contact Sales
//           </button>
//           <button className="bg-white hover:bg-gray-50 text-cyan-600 font-medium py-2 px-6 rounded-lg border border-cyan-600 transition duration-300">
//             Enterprise Solutions
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client"
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
   
    email: '',
   
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Submit logic would go here
    toast.success('Your message has been sent!');
    setFormData({
     
      email: '',
     
      message: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Contact IT Solutions</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions about our products or need technical support? Our team is ready to assist you.
        </p>
      </div>

      {/* Two Column Layout - Contact Info + Form */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">support@itsolutions.com</p>
                  <p className="text-gray-600">sales@itsolutions.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Phone className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">+1 (800) 123-4567 (Toll-free)</p>
                  <p className="text-gray-600">+1 (555) 123-4567 (International)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">123 Tech Park Drive</p>
                  <p className="text-gray-600">San Francisco, CA 94107</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Clock className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Hours</h3>
                  <p className="text-gray-600">Monday-Friday: 8AM - 8PM EST</p>
                  <p className="text-gray-600">Saturday: 10AM - 6PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Technical Support</h2>
            <p className="text-gray-600 mb-4">
              For immediate technical assistance, try our 24/7 live chat or knowledge base.
            </p>
            <button className="flex items-center gap-2 text-cyan-600 font-medium">
              <MessageSquare className="w-5 h-5" />
              Start Live Chat
            </button>
          </div> */}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
         

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                required
              />
            </div>

          

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      {/* <div className="mt-16 bg-gray-50 rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.665325826357!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-xl"
        ></iframe>
      </div> */}
    </motion.div>
  );
}