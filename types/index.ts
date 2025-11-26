import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons"

export type ProcessType = {
  step: number
  title: string
  description: string
  image?: string
  tagline?: string
  icon?: IconType | LucideIcon
}

export interface WebPageContent {
  heroSection?: HeroSection;
  featuresSection?: {
    title: string;
    features: FeatureItem[]
  };
  process?: ProcessType[];
}

export interface HeroSection {
  tag: string;
  title: React.ReactElement;
  description: string;
  displayElements?: React.ReactElement[];
}


export interface ServiceItem {
  id: number;
  name: string;
  tagline: string;
  icon: IconType;
  description: string;
  url: string;
  slug?: string;
  webPageContent?: WebPageContent;
}

export interface ServiceGroup {
  tag?: string; // e.g. "generic"
  title: string; // e.g. "Main Services"
  servicesList: ServiceItem[];
}

export type ServicesType = ServiceGroup[];



// Define the shape of your feature data
export interface FeatureItem {
  category: string;
  title: string;
  description?: string;
  icon: LucideIcon | IconType;
}
