
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send, MessageSquare, ThumbsUp } from 'lucide-react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Thank you for your feedback!', {
        description: 'We appreciate your thoughts and suggestions.'
      });
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="bg-harvest-500 p-6 text-white">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <MessageSquare className="h-6 w-6" />
          <h3 className="text-xl font-bold">We Value Your Feedback</h3>
        </div>
        <p className="text-center text-white/90">
          Help us improve your experience with Harvest Hub
        </p>
      </div>
      
      {isSubmitted ? (
        <div className="bg-white p-8 text-center">
          <div className="w-16 h-16 bg-harvest-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-up">
            <ThumbsUp className="h-8 w-8 text-harvest-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
          <p className="text-gray-600">Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-white"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-white"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Feedback</Label>
            <Textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              className="bg-white resize-none min-h-[120px]"
              placeholder="Share your thoughts, suggestions, or experiences..."
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-harvest-500 hover:bg-harvest-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
