import { JSX } from "react";

export interface IEducationProps {
  key: number;
  title: string;
  description: string;
}

export interface ICertificationProps {
  title: string;
  year: string;
  organization: string;
  status: string;
  order?: number;
  icon: JSX.Element;
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

export interface IProject {
  name: string;
  description: string;
  image: string;
  repo: string;
  demo: string;
  tags: string;
  year: string;
  technologies: string[];
}

export interface ISong {
  album: string;
  artists: string;
  image: string;
  title: string;
  url: string;
  year: string;
}
