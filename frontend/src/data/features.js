import chatIcon from '../assets/img/icon-chat.png';
import moneyIcon from '../assets/img/icon-money.png';
import securityIcon from '../assets/img/icon-security.png';

export const features = [
    {
        id: 1,
        title: 'You are our #1 priority',
        text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
        image: chatIcon,
        imageAltText: 'Chat icon',
    },
    {
        id: 2,
        title: 'More savings means higher rates',
        text: 'The more you save with us, the higher your interest rate will be!',
        image: moneyIcon,
        imageAltText: 'Money icon',
    },
    {
        id: 3,
        title: 'Security you can trust',
        text: 'We use top of the line encryption to make sure your data and money is always safe.',
        image: securityIcon,
        imageAltText: 'Security icon',
    },
];
// console.log('features', features);