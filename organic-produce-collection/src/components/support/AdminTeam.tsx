
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const AdminTeam = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Admin Team</CardTitle>
        <CardDescription>
          Our dedicated team of administrators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-harvest-100">
            <AvatarImage src="https://ik.imagekit.io/Subhransu/SWASTIK.jpg?updatedAt=1742743038896" alt="Swastik Kumar Das" />
            {/* <AvatarFallback className="bg-harvest-100 text-harvest-700 font-bold">SK</AvatarFallback> */}
          </Avatar>
          <div>
            <h3 className="font-medium">Swastik Kumar Das</h3>
            <p className="text-xs text-gray-500">Order Processing Management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-harvest-100">
            <AvatarImage src="https://ik.imagekit.io/Subhransu/Mamun.jpg?updatedAt=1742743038614" alt="Soumyashree Nayak" />
            {/* <AvatarFallback className="bg-harvest-100 text-harvest-700 font-bold">SN</AvatarFallback> */}
          </Avatar>
          <div>
            <h3 className="font-medium">Soumyashree Nayak</h3>
            <p className="text-xs text-gray-500">CEO and Founder</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 border-2 border-harvest-100">
            <AvatarImage src="https://ik.imagekit.io/Subhransu/MIKUN%2019.jpg?updatedAt=1742743038903" alt="Subhransu Mohapatra" />
            {/* <AvatarFallback className="bg-harvest-100 text-harvest-700 font-bold">SM</AvatarFallback> */}
          </Avatar>
          <div>
            <h3 className="font-medium">Subhransu Mohapatra</h3>
            <p className="text-xs text-gray-500">Lead Developer cum Head of Operations</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTeam;
