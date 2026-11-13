import { IconType } from 'react-icons';
import { FaBrain, FaCogs, FaPhone, FaChartLine, FaFileAlt, FaExchangeAlt } from 'react-icons/fa';

export interface AutomationCapability {
  id: string;
  title: string;
  description: string;
  examples: string;
  icon: IconType;
}

export const automationCapabilities: AutomationCapability[] = [
  {
    id: 'ai-assistants',
    title: 'AI Agents & Intelligent Assistants',
    description: 'Help people find information and complete defined tasks with assistants connected to approved business data and tools.',
    examples: 'Knowledge search, customer enquiries and human-reviewed actions',
    icon: FaBrain,
  },
  {
    id: 'workflow-automation',
    title: 'Intelligent Workflow Automation',
    description: 'Coordinate repetitive work across applications, teams and data sources with clear triggers and decision points.',
    examples: 'Approvals, notifications, reporting and data synchronization',
    icon: FaCogs,
  },
  {
    id: 'voice-conversations',
    title: 'AI Voice & Conversational Systems',
    description: 'Design conversational experiences for defined enquiries, appointments and routing, with escalation when needed.',
    examples: 'Reception, scheduling and updates to business systems',
    icon: FaPhone,
  },
  {
    id: 'sales-crm',
    title: 'AI Sales & CRM Automation',
    description: 'Connect lead intake, qualification and follow-up so sales teams can focus on the right conversations.',
    examples: 'Lead routing, CRM updates and follow-up drafts',
    icon: FaChartLine,
  },
  {
    id: 'document-processing',
    title: 'Intelligent Document Processing',
    description: 'Extract, classify and route business information while keeping people involved in exceptions and sensitive decisions.',
    examples: 'Invoices, forms, purchase orders and review queues',
    icon: FaFileAlt,
  },
  {
    id: 'systems-integration',
    title: 'Enterprise Systems Integration',
    description: 'Connect existing business applications and custom software through suitable APIs, webhooks and integration services.',
    examples: 'ERP and CRM synchronization, connectors and error recovery',
    icon: FaExchangeAlt,
  },
];
