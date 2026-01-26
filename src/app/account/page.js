import React from 'react';
import AccountTab from '../../components/AccountTab';

export const metadata = {
  title: 'My Account | BizCall MK',
  description: 'Manage your profile and account settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountTab />;
}
