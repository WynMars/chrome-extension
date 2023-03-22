const { Configuration, OpenAIApi } = require("openai");

// chrome.storage.local.get(["openaiApiKey"]).then(({ openaiApiKey }) => {
//   const configuration = new Configuration({
//     apiKey: openaiApiKey,
//   });
//   openai = new OpenAIApi(configuration);
// });

// //add listener
// chrome.storage.onChanged.addListener((changes) => {
//   for (let [key, { newValue }] of Object.entries(changes)) {
//     if (key !== "openaiApiKey") continue;
//     openai = new OpenAIApi(new Configuration({ apiKey: newValue }));
//   }
// });


export async function fetchOpenaiData(question: string, apiKey: string) {
  const DEFAULT_PARAMS = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(DEFAULT_PARAMS),
  };

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    requestOptions
  );

  const data = await response.json();
  console.log(data.choices[0].message.content);
  return data.choices[0].message.content;
}





// export async function fetchOpenaiData(question: string): Promise<any> {
//   console.log("OpenAI Post");

//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: question }],
//   });

//   if (!completion.ok) {
//     throw new Error("Something went wrong");
//   }

//   const data = await completion.json(completion.data.choices[0].message);

//   console.log(data);
//   return data;
// }
