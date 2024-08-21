document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

    function mainFunc(){
        function extractQuestionsAndAnswers(element){
            try{
                let question = element.children[0].children[0].children[0].children[0].innerText;
                let answer = element.children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].textContent
    
                let questionAndOptions = question.split("\n");
                question = questionAndOptions[0]
                
                let i = 1;
                let options = [];
                for (i; i < questionAndOptions.length-1; i++) {
                    options.push(questionAndOptions[i])
                }


                console.log("question: " + question)
                console.log("options: " + options.join('\n'))
                questionAndOptions = question + "\n" + options.join('\n')
    
                return [questionAndOptions, answer].join("~~")
            }
            catch{
                console.log(element);
                return "\n"
            }
        }

        let viewMore = document.getElementsByClassName("AssemblyButtonBase AssemblyTextButton AssemblyTextButton--secondary AssemblyButtonBase--large AssemblyButtonBase--padding")
        if (viewMore.length > 0){
            viewMore[0].click()
        }
        let info = [];
        const allQuestionsAndAnswers = document.getElementsByClassName("SetPageTerms-term");
        
        for (ele of allQuestionsAndAnswers){
            info.push(extractQuestionsAndAnswers(ele));
        }

        const link = document.createElement("a");
        const file = new Blob([info.join("##")], { type: 'text/plain' });

        link.href = URL.createObjectURL(file);
        link.download = "questions.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: mainFunc,
        }).then(() => console.log('Injected a function!'));
    });
});