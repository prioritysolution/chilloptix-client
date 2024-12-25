import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import * as TiIcons from "react-icons/ti";
import * as GoIcons from "react-icons/go";
import * as SiIcons from "react-icons/si";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as CgIcons from "react-icons/cg";
import * as ImIcons from "react-icons/im";
import * as VscIcons from "react-icons/vsc";
import * as HiIcons from "react-icons/hi";
import * as TbIcons from "react-icons/tb";

// Define the type for the icon sets
type IconSets = {
  [key: string]: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  >;
};

// Map of all available icon sets
const iconSets: IconSets = {
  fa: FaIcons,
  md: MdIcons,
  gi: GiIcons,
  io: IoIcons,
  ti: TiIcons,
  go: GoIcons,
  si: SiIcons,
  fi: FiIcons,
  ai: AiIcons,
  bs: BsIcons,
  bi: BiIcons,
  ri: RiIcons,
  cg: CgIcons,
  im: ImIcons,
  vsc: VscIcons,
  hi: HiIcons,
  tb: TbIcons,
};

// Props for IconDisplay
interface IconDisplayProps {
  iconName: string;
  iconSet: keyof typeof iconSets;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any; // To support other HTML or React props
}

// Function to get the icon component based on the string name
const getIcon = (iconName: string, iconSet: keyof typeof iconSets) => {
  // Get the correct icon component
  const IconComponent = iconSets[iconSet]?.[iconName];
  return IconComponent ? <IconComponent /> : null;
};

// Component to display the icon
const IconDisplay: React.FC<IconDisplayProps> = ({
  iconName,
  iconSet,
  ...rest
}) => {
  return <span {...rest}>{getIcon(iconName, iconSet)}</span>;
};

export default IconDisplay;
