import Usages from './Usage';
import Details from './Details';
import Invoices from './Invoices';
import ProviderDetails from './ProviderDetails';
import Earning from './Earning';

export const BillingComponents = [
,
  { component: Usages, id: 'Current Usages' },
  { component: Invoices, id: 'Invoices' },
  { component: Details, id: 'Billing Details' },
];

export const InvoiceComponents = [
  ,
    { component: Earning, id: 'Current Earning' },
    { component: Invoices, id: 'Invoices' },
    { component: ProviderDetails, id: 'Payment Details' },
  ];



// export default BillingComponents;