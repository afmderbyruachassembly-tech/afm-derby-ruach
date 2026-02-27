import { Crosshair, Scale, Vault } from 'lucide-react';
import { LuBookOpen, LuChurch, LuCompass, LuHeart, LuShield, LuUsers } from "react-icons/lu";

const iconMap = {
    LuHeart: LuHeart,
    LuShield: LuShield,
    LuBookOpen: LuBookOpen,
    LuChurch: LuChurch,
    LuUsers: LuUsers,
    LuCompass: LuCompass,
    Vault: Vault,
    Crosshair: Crosshair,
    Scale: Scale,
};

const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];

    if (IconComponent) {
        return <IconComponent className="mb-4 h-6 w-6 text-gray-400" />;
    }

    // Fallback if icon is not found
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return <div className="mb-4 h-8 w-8 rounded bg-gray-300" />;
};

export default renderIcon;