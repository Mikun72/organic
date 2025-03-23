
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const ContactInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Reach out to us through any of these channels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-harvest-600 mt-0.5" />
          <div>
            <h3 className="font-medium">Email Us</h3>
            <p className="text-sm text-gray-600">support@freshharvesthub.com</p>
            <p className="text-xs text-gray-500 mt-1">We usually respond within 24 hours</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-harvest-600 mt-0.5" />
          <div>
            <h3 className="font-medium">Call Us</h3>
            <p className="text-sm text-gray-600">+91 9337385677</p>
            <p className="text-xs text-gray-500 mt-1">Available Mon-Sat (9 AM - 6 PM)</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-harvest-600 mt-0.5" />
          <div>
            <h3 className="font-medium">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with our support team</p>
            <p className="text-xs text-gray-500 mt-1">Available during business hours</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          asChild
          variant="outline" 
          className="w-full"
        >
          <a href="/bulk-order-request">Request Bulk Order</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactInformation;
