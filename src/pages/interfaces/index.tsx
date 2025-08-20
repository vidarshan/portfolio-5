export interface IEducationProps {
  title: string;
  description: string;
}

export interface ICertificationProps {
  title: string;
  year: string;
  organization: string;
  status: string;
}

export interface IExperienceProps {
  title: string;
  date: string;
  description: string;
  skills: string[];
}

export interface IWork {
  company: string;
  jobs: IExperienceProps[];
  link: string;
}
