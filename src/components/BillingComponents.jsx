import Usages from './Usage';
import Details from './Details';
import Invoices from './Invoices';

const BillingComponents = [
,
  { component: Usages, id: 'Current Usages' },
  { component: Invoices, id: 'Invoices' },
  { component: Details, id: 'Billing Details' },
];

export default BillingComponents;