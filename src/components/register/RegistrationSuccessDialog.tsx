import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegistrationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationSuccessDialog: React.FC<RegistrationSuccessDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-semibold text-gray-900">
            Registration Successful!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for registering! Our team will reach out to you soon to verify and list your business on CBN.
          </p>
          
          <div className="pt-4 space-y-3">
            <Button
              asChild
              className="w-full bg-bcircle-blue hover:bg-bcircle-blue/90"
            >
              <Link to="/">
                Return to Home
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessDialog; 