import { NextPage } from 'next';
import HeroWrapper from './_components/hero/HeroWrapper';
import Footer from './_components/shared/Footer';
import HeroServices from './_components/hero/HeroServices';

const Homepage: NextPage = () => {
    return (
        <>
            <HeroWrapper />
            <HeroServices />
            <Footer />
        </>
    );
};

export default Homepage;
