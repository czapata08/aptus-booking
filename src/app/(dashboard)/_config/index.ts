// Nav links config

import {
  AlertCircle,
  MessagesSquare,
  Users2,
  Calendar,
  HelpCircle,
  Settings,
  PresentationIcon,
  CreditCardIcon,
  PartyPopperIcon,
  GraduationCapIcon,
  GroupIcon,
  LampDeskIcon
  // Send,
   // Inbox,
  } from 'lucide-react';
  
  
  export const storeBackend = [
    {
      title: 'Events',
      label: '18',
      icon: PartyPopperIcon,
      variant: 'ghost',
      href: '/dashboard'
    },
    {
      title: 'Bookings',
      label: '180',
      icon: Calendar,
      variant: 'ghost',
      href: '/dashboard'
    },
    {
      title: 'Customers',
      label: '40',
      icon: Users2,
      variant: 'ghost',
      href: '/Dashboard'
    },
    {
      title: 'Payments',
      label: '20',
      icon: CreditCardIcon,
      variant: 'ghost',
      href: '/dashboard'
    },
    {
      title: 'Marketing',
      label: '',
      icon: MessagesSquare,
      variant: 'ghost',
    },
    
  ];
  
  export const schoolDomains = [
    {
      title: 'Classrooms',
      label: '20',
      icon: PresentationIcon,
      variant: 'ghost',
      href: '/portal/directory/school'
    },
    {
      title: 'Students',
      label: '625',
      icon: GraduationCapIcon,
      variant: 'ghost',
      href: '/portal/directory/students'
    },
    {
      title: 'Parents',
      label: '995',
      icon: GroupIcon,
      variant: 'ghost',
      href: '/portal/directory/students'
    },
    {
      title: 'Frontdesk',
      label: '',
      icon: LampDeskIcon,
      variant: 'ghost',
      href: '/portal/directory/frontdesk'
    }
  ];
  
  export const settingsLinks = [
    {
      title: 'Get help',
      label: '',
      icon: HelpCircle,
      variant: 'ghost',
      href: '/dashboard'
    },
    {
      title: 'Settings',
      label: '',
      icon: Settings,
      variant: 'ghost',
      href: '/dashboard'
      },
      {
        title: 'Support',
        label: '',
        icon: AlertCircle,
        variant: 'ghost',
        href: '/dashboard'
      }
  ];
  