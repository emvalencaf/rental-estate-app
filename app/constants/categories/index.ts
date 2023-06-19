// icons
import { IconType } from 'react-icons';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiCactus, GiCastle, GiForestCamp, GiIsland, GiWindmill, GiBarn, } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';


interface Category {
    label: string;
    icon: IconType;
    description: string;
}

export const categories: Category[] = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is mordern!',
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!',
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool!',
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!',
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake!',
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities!',
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is a castle!',
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities!',
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment !',
    },
    {
      label: 'Desert',
      icon: GiCactus,
      description: 'This property is in the desert!'
    },
    {
      label: 'Barns',
      icon: GiBarn,
      description: 'This property is in a barn!'
    },
    {
      label: 'Lux',
      icon: IoDiamond,
      description: 'This property is brand new and luxurious!'
    }

];


export default categories;