import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
type AccordionQAProps = {
    heading: string;
    body: string;
    item: number;
}
function AccordionQA(props: AccordionQAProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
        >
            <AccordionItem value="item-{props.item}" >
                <div className="p-4 border-b border-afm-gray">
                    <AccordionTrigger >
                        <h3 className="text-xl font-bold">{props.heading}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-lg">{props.body}</p>
                    </AccordionContent>
                </div>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionQA;