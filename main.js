document.getElementById('start').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

    function mainFunc(){
        function extractQuestionsAndAnswers(element){
            try{
                let question = element.children[0].children[0].children[0].children[0].innerText;
                let answer = element.children[1].children[0].children[0].children[0].textContent;
    
                questionAndOptions = question.split("\n\n");
                question = questionAndOptions[0]
                options = questionAndOptions[1].split("\n")
    
                return [questionAndOptions, options, answer].join("#")
            }
            catch{
                return ""
            }
        }

        let viewMore = document.getElementsByClassName("AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--medium AssemblyButtonBase--padding AssemblyButtonBase--fullWidth")
        if (viewMore.length > 0){
            viewMore[0].click()
        }
        let info = [];
        const allQuestionsAndAnswers = document.getElementsByClassName("SetPageTerm-content");
        
        for (ele of allQuestionsAndAnswers){
            info.push(extractQuestionsAndAnswers(ele));
        }

        const link = document.createElement("a");
        const file = new Blob([info.join("\n\n")], { type: 'text/plain' });
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