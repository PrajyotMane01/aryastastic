'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  areaOfResearch: string;
  occupation: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    areaOfResearch: '',
    occupation: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Debug input values
  useEffect(() => {
    console.log('Current form data:', formData);
  }, [formData]);
  
  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log('EmailJS Public Key:', publicKey);
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Map the form field names back to our state object properties
    let stateKey = name;
    if (name === 'from_name') stateKey = 'name';
    if (name === 'from_email') stateKey = 'email';
    if (name === 'area_of_research') stateKey = 'areaOfResearch';
    
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    
    console.log('Submitting form with data:', formData);
    
    // Use environment variables or hardcoded values as fallback
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_7b8w0x2'; 
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_2rhgl2e';
    
    try {
      // Create parameters from the form data
      const templateParams = {
        to_email: 'prajyotmane01@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        mobile: formData.mobile,
        area_of_research: formData.areaOfResearch,
        occupation: formData.occupation,
        message: formData.message
      };
      
      // Send email using parameters approach
      const response = await emailjs.send(serviceId, templateId, templateParams);
      console.log('Email sent successfully:', response);
      
      setSubmitStatus({
        success: true,
        message: 'Your consultation request has been submitted successfully! We will get back to you within 24 hours.'
      });
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        areaOfResearch: '',
        occupation: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Try using form method as fallback
      try {
        if (formRef.current) {
          // Add hidden field for to_email
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = 'to_email';
          hiddenInput.value = 'prajyotmane01@gmail.com';
          formRef.current.appendChild(hiddenInput);
          
          const response = await emailjs.sendForm(serviceId, templateId, formRef.current);
          console.log('Email sent successfully via form fallback:', response);
          
          // Clean up hidden input
          formRef.current.removeChild(hiddenInput);
          
          setSubmitStatus({
            success: true,
            message: 'Your consultation request has been submitted successfully! We will get back to you within 24 hours.'
          });
          
          // Reset the form
          setFormData({
            name: '',
            email: '',
            mobile: '',
            areaOfResearch: '',
            occupation: '',
            message: ''
          });
        } else {
          throw new Error('Form reference not available');
        }
      } catch (secondError) {
        console.error('Form fallback email sending failed:', secondError);
        setSubmitStatus({
          success: false,
          message: 'There was a problem submitting your request. Please try again or contact us directly.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-screen flex flex-col lg:flex-row pt-20">
        {/* Left Side - Contact Information */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-teal-100 via-cyan-50 to-slate-100 relative overflow-hidden flex items-center justify-center py-16 lg:py-0">
          <div className="max-w-lg text-center px-4">
            {/* Profile Section */}
            <div className="mb-12">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 shadow-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-light text-slate-800 mb-2 tracking-tight">
                Dr. Dashrath R Basannar
              </h1>
              <p className="text-base lg:text-lg text-slate-600 mb-8 font-light">
                Scientist F (Retd)
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span className="text-slate-800 font-medium">Email</span>
                </div>
                <p className="text-slate-600 text-sm lg:text-base break-all">
                  ayrastatisticalconsultancy@gmail.com
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span className="text-slate-800 font-medium">Mobile</span>
                </div>
                <p className="text-slate-600 text-sm lg:text-base">
                  +91 9420697320
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-slate-800 font-medium">Response Time</span>
                </div>
                <p className="text-slate-600 text-sm lg:text-base">
                  Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center py-16 lg:py-0">
          <div className="max-w-lg px-4 lg:px-12 w-full">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-teal-50 rounded-full text-teal-700 text-sm font-medium tracking-wide">
                GET IN TOUCH
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-light text-slate-800 mb-8 tracking-tight leading-tight">
              CONSULTATION<br />
              REQUEST
            </h2>
            
            <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed font-light">
              For consultation, please complete the following contact form and submit.
            </p>

            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Name *
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 placeholder-slate-400 transition-all disabled:opacity-60"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Email *
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 placeholder-slate-400 transition-all disabled:opacity-60"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Mobile Number *
                </label>
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 placeholder-slate-400 transition-all disabled:opacity-60"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Area of Research *
                </label>
                <input 
                  type="text" 
                  name="areaOfResearch"
                  value={formData.areaOfResearch}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 placeholder-slate-400 transition-all disabled:opacity-60"
                  placeholder="Your research domain"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Occupation *
                </label>
                <select 
                  name="occupation" // Match EmailJS template variable
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 transition-all disabled:opacity-60"
                >
                  <option value="" disabled className="text-slate-400">Select your occupation</option>
                  <option value="faculty" className="text-slate-800">Faculty</option>
                  <option value="phd-student" className="text-slate-800">PhD Student</option>
                  <option value="pg-student" className="text-slate-800">PG Student</option>
                  <option value="ug-student" className="text-slate-800">UG Student</option>
                  <option value="research-scholar" className="text-slate-800">Research Scholar</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-3">
                  Message *
                </label>
                <textarea 
                  rows={4} 
                  name="message" // Match EmailJS template variable
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-0 py-4 border-0 border-b-2 border-slate-200 focus:border-teal-400 focus:ring-0 bg-transparent text-slate-800 placeholder-slate-400 transition-all resize-none disabled:opacity-60"
                  placeholder="Describe your consultation requirements..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Submit Consultation Request'
                )}
              </button>
              
              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="from_name" value={formData.name} />
              <input type="hidden" name="from_email" value={formData.email} />
              <input type="hidden" name="area_of_research" value={formData.areaOfResearch} />
            </form>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-8 tracking-tight">
            What to Expect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Quick Response</h3>
              <p className="text-slate-600 font-light text-sm">
                Initial response within 24 hours of form submission
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Detailed Consultation</h3>
              <p className="text-slate-600 font-light text-sm">
                Comprehensive discussion of your research requirements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">Customized Solution</h3>
              <p className="text-slate-600 font-light text-sm">
                Tailored statistical consulting plan for your project
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
