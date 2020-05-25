'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area'); 
const tweetDivided =document.getElementById('tweet-area');

/**
 *指定した子どもの要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while (element.firstChild){ //子どもの要素がある限り削除
       element.removeChild(element.firstChild);
     }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      assessmentButton.onclick ();
    } 
} 
     
assessmentButton.onclick =　() => {
    const userName = userNameInput.value;
    if (userName.length === 0){ //空欄の場合は処理を終了
        return ;
    }
    
    //TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果'
    resultDivided.appendChild(header);
     
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph)

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
       + encodeURIComponent('あなたのいいところ')
       + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet ＃あなたのいいところ';
　　 tweetDivided.appendChild(anchor);
    
    
    //widgets.jsの設定
    const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};





const answers = [
    '{UserName}のいいところは声です。{UserName}の特徴的な声はみんなを惹きつけ、心に残ります。',
    '{UserName}のいいところはまなざしです。{UserName}に見つめられた人は、気になって仕方がないでしょう。',
    '{UserName}のいいところは情熱です。{UserName}情熱に周りの人は感化されます。',
    '{UserName}のいいところは厳しさです。{UserName}の厳しさが物事をいつも成功に導きます。',
    '{UserName}のいいところは知識です。博識な{UserName}を多くの人が頼りにしています。',
    '{UserName}のいいところはユニークさです。{UserName}だけのその特徴がみんなを楽しくさせます。',
    '{UserName}のいいところは用心深さです。{UserName}の洞察に、多くの人が助けられます。',
    '{UserName}のいいところは見た目です。内側から溢れ出る{UserName}の良さに、みんなが気を惹かれます。',
    '{UserName}のいいところは決断力です。{UserName}がする決断にいつも助けられる人がいます。',
    '{UserName}のいいところは思いやりです。{UserName}に気をかけてもらった多くの人が感謝しています。',
    '{UserName}のいいところは感受性です。{UserName}が感じたことにみんなが共感し、わかり合うことができます。',
    '{UserName}のいいところは節度です。強引すぎない{UserName}の考えにみんなが感謝しています。',
    '{UserName}のいいところは好奇心です。新しいことに向かっていく{UserName}の心構えが多くの人に魅力的に映ります。',
    '{UserName}のいいところは気配りです。{UserName}の配慮が多くの人を救っています。',
    '{UserName}のいいところはその全てです。ありのままの{UserName}自身がいいところなのです。', 
    '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
*/
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
      sumOfCharCode =sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を解答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{UserName\}/g,userName);
    return result;
}
