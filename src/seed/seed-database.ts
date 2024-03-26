import { initialData } from "./seed";


async function main() {
    console.log('Start seeding ...');
    console.log('data is', initialData);
    
    console.log('Seed finished');
}


(()=>{
    main();
})();