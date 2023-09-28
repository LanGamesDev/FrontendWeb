import { AccordionTab } from 'primereact/accordion';
import { useState } from 'react';
import { Translate } from '../../../../types/words/Translate';

interface AccordionTranslateProps {

}

const AccordionTranslate: React.FC<AccordionTranslateProps> = ({}) => {
    const [words, setWords] = useState<Translate[]>([]);

    return (
        <AccordionTab header="Header I" className="accordionTab">
            <div>
                
            </div>
        </AccordionTab>
    )
    
}

export default AccordionTranslate