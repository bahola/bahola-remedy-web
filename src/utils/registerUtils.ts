
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomerFormData, DoctorFormData, UserType } from '@/schemas/registerSchema';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

export const useRegisterSubmit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { register } = useERPNextAuth();
  
  const handleSubmit = async (values: CustomerFormData | DoctorFormData, userType: UserType) => {
    try {
      const registrationData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
        userType,
        ...(userType === 'doctor' ? {
          medicalLicense: (values as DoctorFormData).medicalLicense,
          specialization: (values as DoctorFormData).specialization,
        } : {})
      };

      await register(registrationData);

      toast({
        title: "Registration Successful",
        description: `Welcome! You have been registered as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'} and are now logged in.`,
        duration: 5000,
      });
      
      // Redirect to the return URL if available, otherwise to home page
      navigate(returnUrl || '/');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was a problem with your registration. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return { handleSubmit };
};
