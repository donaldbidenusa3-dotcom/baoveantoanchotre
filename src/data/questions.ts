export interface QuestionItem {
  id: number;
  topicId: number;
  topicName: string;
  levelId: number;
  monsterName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleTip: string;
}

export const QUESTIONS_BANK: QuestionItem[] = [
  // --- CHỦ ĐỀ 1: NHẬN BIẾT CƠ THỂ VÀ QUYỀN RIÊNG TƯ (Câu 1–10) -> LEVEL 1 ---
  {
    id: 1,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Những bộ phận nào trên cơ thể được xem là vùng riêng tư?",
    options: [
      "Những vùng thường được đồ bơi hoặc đồ lót che kín.",
      "Chỉ có hai bàn tay và hai bàn chân.",
      "Bất kỳ chỗ nào trên cơ thể cũng không phải vùng riêng tư."
    ],
    correctIndex: 0,
    explanation: "Vùng riêng tư bao gồm miệng, ngực, phần giữa hai đùi và mông (những nơi đồ bơi che kín). Không ai được phép chạm vào mà không có lý do chăm sóc sức khỏe chính đáng.",
    ruleTip: "Quy tắc đồ bơi: Nơi nào đồ bơi che, nơi đó là bất khả xâm phạm!"
  },
  {
    id: 2,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Cơ thể của em thuộc về ai?",
    options: [
      "Thuộc về bạn bè chơi cùng.",
      "Thuộc về chính em.",
      "Thuộc về bất kỳ người lớn nào em gặp."
    ],
    correctIndex: 1,
    explanation: "Em là chủ nhân duy nhất của cơ thể mình. Em có quyền quyết định ai được và không được chạm vào cơ thể em.",
    ruleTip: "Cơ thể là của em - Em là người bảo vệ cơ thể mình!"
  },
  {
    id: 3,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Em có quyền từ chối một cái ôm khi em cảm thấy không muốn không?",
    options: [
      "Có, em hoàn toàn có quyền từ chối lịch sự.",
      "Không, em bắt buộc phải ôm bất kỳ ai muốn ôm em.",
      "Chỉ được từ chối nếu người đó là bạn nhỏ bằng tuổi."
    ],
    correctIndex: 0,
    explanation: "Nếu em không thích cái ôm, em có thể thay thế bằng vẫy tay chào hoặc đập tay (high-five). Mọi người cần tôn trọng cảm giác của em.",
    ruleTip: "Em có quyền từ chối mọi đụng chạm khiến em không thoải mái."
  },
  {
    id: 4,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Người khác có được tự ý chạm vào vùng riêng tư của em không?",
    options: [
      "Được nếu người đó cho em kẹo hoặc quà.",
      "Được nếu họ hứa sẽ giữ bí mật.",
      "Không bao giờ được tự ý chạm vào."
    ],
    correctIndex: 2,
    explanation: "Không ai được phép chạm vào vùng riêng tư của em, dù họ hứa cho quà, đồ chơi hay tiền. Đó là hành vi sai trái.",
    ruleTip: "Không quà tặng nào có thể đổi lấy vùng riêng tư của em!"
  },
  {
    id: 5,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Nếu cảm thấy không thoải mái khi ai đó đến quá gần, em nên làm gì?",
    options: [
      "Lùi lại, nói rõ cảm giác và tìm người đáng tin cậy nếu cần.",
      "Đứng yên và cố chịu đựng sự khó chịu.",
      "Không nói gì và giữ im lặng một mình."
    ],
    correctIndex: 0,
    explanation: "Khi cảm thấy ai đó đứng quá sát khiến em ngột ngạt hoặc bất an, hãy bước lùi lại 2 bước và nói: 'Xin hãy giữ khoảng cách với cháu/tớ'.",
    ruleTip: "Bước lùi lại và thiết lập không gian an toàn cho mình!"
  },
  {
    id: 6,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Em có cần đồng ý trước khi người khác ôm hoặc hôn mình không?",
    options: [
      "Có, sự đồng ý của em là rất quan trọng.",
      "Không, người lớn muốn làm gì cũng được.",
      "Chỉ cần đồng ý với người lạ thôi."
    ],
    correctIndex: 0,
    explanation: "Bất kỳ hành động thể hiện tình cảm nào cũng cần có sự thoải mái và đồng thuận từ em.",
    ruleTip: "Sự đồng ý của em luôn là điều cần được tôn trọng trước tiên."
  },
  {
    id: 7,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Nếu em không thích bị cù lét hoặc đụng chạm đùa giỡn, em có quyền nói dừng lại không?",
    options: [
      "Không, vì người khác chỉ đang đùa vui thôi.",
      "Có, em có toàn quyền nói 'Dừng lại!' ngay lập tức.",
      "Phải đợi người đó tự chán rồi dừng."
    ],
    correctIndex: 1,
    explanation: "Rất đúng! Kể cả trò đùa cù lét, nếu em thấy mệt mỏi, khó thở hoặc không vui, từ 'Dừng lại' của em phải được mọi người tôn trọng.",
    ruleTip: "Khi em nói 'Dừng lại!', trò chơi phải lập tức kết thúc!"
  },
  {
    id: 8,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Ai có quyền quyết định ranh giới cơ thể của em?",
    options: [
      "Bất kỳ ai lớn tuổi hơn em.",
      "Chính em.",
      "Người lạ ngoài đường."
    ],
    correctIndex: 1,
    explanation: "Chính em là thuyền trưởng chỉ huy cơ thể mình. Em có tiếng nói cao nhất về sự an toàn và thoải mái của bản thân.",
    ruleTip: "Em là chủ nhân cơ thể của chính mình!"
  },
  {
    id: 9,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Bác sĩ có thể kiểm tra vùng cơ thể em trong trường hợp nào?",
    options: [
      "Bất cứ khi nào bác sĩ muốn, kể cả khi không có bệnh.",
      "Khi cần chăm sóc sức khỏe, có giải thích phù hợp và có người thân đáng tin cậy ở cạnh.",
      "Bác sĩ có thể gọi em vào phòng kín một mình mà không cho bố mẹ biết."
    ],
    correctIndex: 1,
    explanation: "Khi đi khám bệnh, bác sĩ chỉ kiểm tra khi có bố mẹ hoặc người giám hộ đi cùng, và bác sĩ luôn giải thích rõ trước khi khám.",
    ruleTip: "Khám bệnh luôn cần có bố mẹ hoặc người thân tin cậy đồng hành!"
  },
  {
    id: 10,
    topicId: 1,
    topicName: "Nhận biết cơ thể & Quyền riêng tư",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Nếu một người khiến em cảm thấy không an toàn hoặc lo sợ, em có nên tránh xa không?",
    options: [
      "Có, hãy lập tức tránh xa và đến nơi an toàn.",
      "Không, phải đứng yên xem người đó định làm gì.",
      "Cứ ở lại vì sợ làm người đó buồn."
    ],
    correctIndex: 0,
    explanation: "Giác quan thứ sáu và cảm giác bất an là chiếc chuông báo động tự nhiên của em. Hãy tin vào cảm giác đó và rời đi ngay.",
    ruleTip: "Cảm thấy không an toàn -> Rời đi ngay lập tức!"
  },

  // --- CHỦ ĐỀ 2: RANH GIỚI CƠ THỂ VÀ KỸ NĂNG NÓI KHÔNG (Câu 11–20) -> LEVEL 2 ---
  {
    id: 11,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Một người muốn ôm em nhưng em không thích. Em nên làm gì?",
    options: [
      "Lịch sự từ chối bằng cách nói rõ ràng: 'Cháu không muốn ôm, cháu chào bác ạ'.",
      "Bắt buộc phải để họ ôm dù rất sợ.",
      "Chạy đến đánh người đó."
    ],
    correctIndex: 0,
    explanation: "Em có thể từ chối một cách dứt khoát nhưng lịch sự. Em có thể bắt tay hoặc cúi chào thay vì ôm.",
    ruleTip: "Từ chối lịch sự và rõ ràng là quyền của em!"
  },
  {
    id: 12,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Bạn bè có được tự ý kéo quần áo hoặc vén váy/áo của em không?",
    options: [
      "Được nếu chỉ là trêu chọc cho vui.",
      "Không, đó là hành vi xâm phạm ranh giới cá nhân, dù là đùa giỡn.",
      "Được nếu các bạn khác cũng hùa theo."
    ],
    correctIndex: 1,
    explanation: "Kéo quần áo hay tốc váy người khác không phải là trò đùa mà là hành vi xâm phạm ranh giới riêng tư, cần phải ngăn chặn ngay.",
    ruleTip: "Quần áo che vùng riêng tư - Tuyệt đối không để ai kéo hoặc đụng vào!"
  },
  {
    id: 13,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Nếu ai đó không dừng lại khi em đã nói KHÔNG, em nên làm gì?",
    options: [
      "Im lặng và bỏ cuộc.",
      "Rời khỏi đó ngay lập tức và tìm người lớn đáng tin cậy để kể lại.",
      "Đồng ý làm theo ý họ."
    ],
    correctIndex: 1,
    explanation: "Nếu đối phương phớt lờ lời nói 'KHÔNG', hãy lập tức chạy đến chỗ đông người hoặc tìm thầy cô, bố mẹ để được giúp đỡ.",
    ruleTip: "3 Bước bảo vệ: Nói KHÔNG -> BỎ CHẠY -> BÁO NGƯỜI LỚN!"
  },
  {
    id: 14,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Em có thể từ chối một trò chơi khiến mình cảm thấy khó chịu hoặc sợ hãi không?",
    options: [
      "Có, em có toàn quyền rời khỏi trò chơi bất cứ lúc nào.",
      "Không, một khi đã chơi thì phải chơi đến cùng.",
      "Chỉ được từ chối nếu có bạn khác xin nghỉ cùng."
    ],
    correctIndex: 0,
    explanation: "Trò chơi phải mang lại niềm vui an toàn cho tất cả mọi người. Nếu trò chơi khiến em khó chịu, em có quyền dừng ngay.",
    ruleTip: "Trò chơi an toàn là trò chơi mọi người đều vui vẻ và thoải mái!"
  },
  {
    id: 15,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Nếu một người yêu cầu em chạm vào vùng riêng tư của họ, em nên làm gì?",
    options: [
      "Làm theo vì họ bảo đó là trò chơi bí mật.",
      "Từ chối dứt khoát, lập tức rời đi và kể với người lớn đáng tin cậy.",
      "Giữ bí mật không nói với ai."
    ],
    correctIndex: 1,
    explanation: "Tuyệt đối chính xác! Yêu cầu chạm vào vùng riêng tư của người khác là hành vi xâm hại cực kỳ nguy hiểm. Em phải hét to từ chối và chạy ngay!",
    ruleTip: "Không ai được chạm vào em và em không chạm vào vùng riêng tư của ai!"
  },
  {
    id: 16,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Nếu bạn bè ép em tham gia một hành động nguy hiểm hoặc làm em khó chịu, em nên làm gì?",
    options: [
      "Nói KHÔNG và tìm kiếm sự giúp đỡ từ người lớn.",
      "Làm theo để không bị bạn bè tẩy chay.",
      "Đồng ý vì sợ bạn không chơi cùng nữa."
    ],
    correctIndex: 0,
    explanation: "Rất dũng cảm! Bạn tốt thực sự sẽ không bao giờ ép em làm những điều sai trái, nguy hiểm hoặc gây tổn thương cho em.",
    ruleTip: "Dũng cảm nói KHÔNG với những lời rủ rê nguy hiểm!"
  },
  {
    id: 17,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Em có phải đồng ý với mọi yêu cầu của người lớn không?",
    options: [
      "Có, bất kể yêu cầu đó là gì.",
      "Không. Nếu yêu cầu đó gây nguy hại, xâm phạm cơ thể hoặc vi phạm điều đúng đắn, em có quyền từ chối.",
      "Luôn luôn phải nghe lời mọi người lạ."
    ],
    correctIndex: 1,
    explanation: "Lễ phép với người lớn là tốt, nhưng nếu một người lớn yêu cầu làm điều sai trái hoặc xâm phạm cơ thể, em có toàn quyền từ chối.",
    ruleTip: "Tự bảo vệ mình là điều quan trọng nhất!"
  },
  {
    id: 18,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Nếu ai đó yêu cầu em giữ một bí mật khiến em thấy lo lắng, sợ hãi hoặc tội lỗi, em nên làm gì?",
    options: [
      "Giữ kín mãi mãi trong lòng.",
      "Kể ngay với người lớn đáng tin cậy (bố mẹ, thầy cô).",
      "Chỉ kể khi có người khác phát hiện ra."
    ],
    correctIndex: 1,
    explanation: "Đó gọi là 'Bí mật đen' hoặc 'Bí mật xấu'. Bí mật an toàn là bất ngờ vui vẻ (như tiệc sinh nhật). Bí mật xấu làm em sợ hãi thì KHÔNG ĐƯỢC GIỮ!",
    ruleTip: "Không bao giờ giữ những bí mật làm em thấy sợ hãi hay bất an!"
  },
  {
    id: 19,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Em có quyền thay đổi quyết định khi không còn cảm thấy thoải mái nữa không?",
    options: [
      "Có, em có thể nói 'Bây giờ tớ không thích nữa, dừng lại đi'.",
      "Không, đã đồng ý lúc đầu thì không được đổi ý.",
      "Chỉ được đổi ý nếu được người khác cho phép."
    ],
    correctIndex: 0,
    explanation: "Cảm xúc của em có thể thay đổi. Lúc đầu em có thể đồng ý chơi, nhưng nếu sau đó thấy khó chịu, em hoàn toàn có quyền dừng lại.",
    ruleTip: "Em luôn có quyền đổi ý và nói dừng lại bất cứ lúc nào!"
  },
  {
    id: 20,
    topicId: 2,
    topicName: "Ranh giới cơ thể & Nói KHÔNG",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Khi cảm thấy không an toàn, em có thể kêu cứu thật to không?",
    options: [
      "Không, vì hét to là mất trật tự.",
      "Có, hãy hét thật to để mọi người xung quanh nghe thấy và đến giúp.",
      "Chỉ được nói thầm."
    ],
    correctIndex: 1,
    explanation: "Tiếng hét cầu cứu của em là vũ khí phòng vệ lợi hại nhất. Hãy hét lớn: 'CỨU CHÁU VỚI!' hoặc 'CHÁU KHÔNG QUEN NGƯỜI NÀY!'.",
    ruleTip: "Hét to cầu cứu khi gặp nguy hiểm là hành động dũng cảm!"
  },

  // --- CHỦ ĐỀ 3: NHẬN DIỆN HÀNH VI XÂM HẠI (Câu 21–30) -> LEVEL 3 ---
  {
    id: 21,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Một người cố tình chạm vào vùng riêng tư của em mà không có lý do chăm sóc sức khỏe chính đáng. Đây có phải hành vi đáng lo ngại không?",
    options: [
      "Có, đây là hành vi xâm hại nghiêm trọng và hoàn toàn sai trái.",
      "Không, chắc người đó chỉ vô tình thôi.",
      "Chỉ đáng lo khi người đó dùng bạo lực."
    ],
    correctIndex: 0,
    explanation: "Bất kỳ ai cố tình chạm vào vùng riêng tư đều là hành vi xâm phạm luật pháp và sự an toàn của trẻ em. Em phải báo ngay cho bố mẹ.",
    ruleTip: "Vùng riêng tư là vùng cấm chạm - Báo ngay khi bị xâm phạm!"
  },
  {
    id: 22,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Một người yêu cầu em cởi quần áo để họ xem hoặc chụp ảnh. Em nên làm gì?",
    options: [
      "Từ chối dứt khoát, mặc lại quần áo, chạy đi và tìm người lớn đáng tin cậy.",
      "Nghe theo vì họ bảo sẽ khen em đẹp.",
      "Đứng im để họ chụp nhanh rồi thôi."
    ],
    correctIndex: 0,
    explanation: "Không ai có quyền xem, chụp ảnh hoặc quay phim vùng riêng tư của em. Đó là hành vi phạm tội.",
    ruleTip: "Tuyệt đối không cởi đồ hay cho ai chụp ảnh cơ thể mình!"
  },
  {
    id: 23,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Một người yêu cầu em chạm vào vùng riêng tư của họ. Đây có phải tình huống nguy hiểm không?",
    options: [
      "Có, đây là tình huống cực kỳ nguy hiểm.",
      "Không, nếu họ là người quen thì bình thường.",
      "Chỉ là một trò đùa không sao cả."
    ],
    correctIndex: 0,
    explanation: "Bất kể người đó là người lạ hay người quen, yêu cầu này là hoàn toàn sai trái. Em hãy chạy ngay đến chỗ an toàn.",
    ruleTip: "Người lớn lành mạnh không bao giờ bắt trẻ em chạm vào vùng nhạy cảm!"
  },
  {
    id: 24,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Nếu ai đó cố tình nhìn lén hoặc mở cửa khi em đang thay đồ hoặc đi vệ sinh, em nên làm gì?",
    options: [
      "Rời khỏi nơi đó, che chắn cơ thể và báo ngay cho người lớn đáng tin cậy.",
      "Cứ để họ nhìn vì không chạm vào người là được.",
      "Tự trách bản thân mình."
    ],
    correctIndex: 0,
    explanation: "Nhìn trộm khi em thay đồ hoặc đi vệ sinh là hành vi quấy rối xâm phạm quyền riêng tư. Hãy đóng cửa hoặc rời đi và báo ngay.",
    ruleTip: "Quyền riêng tư trong nhà vệ sinh và phòng thay đồ phải được bảo vệ!"
  },
  {
    id: 25,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Một người nói rằng em không được kể với ai về hành động khiến em khó chịu. Em có nên giữ im lặng không?",
    options: [
      "Không, em càng cần phải kể ngay với người lớn đáng tin cậy.",
      "Có, vì người đó dặn rồi nên phải giữ lời hứa.",
      "Đợi vài năm nữa mới kể."
    ],
    correctIndex: 0,
    explanation: "Kẻ xấu thường dùng lời đe dọa để ép trẻ em im lặng. Nhưng em không làm gì sai cả! Hãy dũng cảm kể cho bố mẹ hoặc thầy cô.",
    ruleTip: "Kẻ xấu muốn em im lặng - Lên tiếng là cách em chiến thắng!"
  },
  {
    id: 26,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Nếu một người dùng quà tặng, đồ chơi hay tiền để đổi lấy việc em phải làm điều khiến em không thoải mái, em nên làm gì?",
    options: [
      "Từ chối món quà đó và kể lại cho người đáng tin cậy nghe.",
      "Nhận quà rồi làm theo ý họ.",
      "Lấy quà xong giấu đi không nói với ai."
    ],
    correctIndex: 0,
    explanation: "Đó là 'chiêu trò dụ dỗ'. Kẻ xấu dùng quà để mua chuộc sự tin tưởng. Hãy kiên quyết từ chối và báo cho bố mẹ ngay.",
    ruleTip: "Không đánh đổi sự an toàn của mình lấy bất kỳ món quà nào!"
  },
  {
    id: 27,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Nếu một người quen có hành động khiến em sợ hãi hoặc khó chịu, em có được kể với bố mẹ không?",
    options: [
      "Có, em luôn có quyền kể mọi chuyện với bố mẹ.",
      "Không, vì người quen thì không được nghi ngờ.",
      "Chỉ được kể nếu bố mẹ tự hỏi."
    ],
    correctIndex: 0,
    explanation: "Dù là người quen, hàng xóm hay họ hàng, nếu họ có hành vi không đúng mực, em hoàn toàn có quyền kể với bố mẹ để được bảo vệ.",
    ruleTip: "Bố mẹ luôn là chỗ dựa tin cậy của em khi gặp chuyện khó khăn!"
  },
  {
    id: 28,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Chỉ người lạ mới có thể thực hiện hành vi xâm hại trẻ em. Đúng hay sai?",
    options: [
      "Sai, cả người quen cũng có thể thực hiện hành vi xâm hại nếu họ có ý đồ xấu.",
      "Đúng, người quen thì 100% không bao giờ làm điều sai.",
      "Chỉ có quái vật trong phim mới làm vậy."
    ],
    correctIndex: 0,
    explanation: "Thực tế phần lớn các vụ xâm hại đến từ những người quen biết. Vì vậy quy tắc ranh giới cơ thể áp dụng với TẤT CẢ mọi người.",
    ruleTip: "Ranh giới cơ thể áp dụng với tất cả mọi người, kể cả người quen!"
  },
  {
    id: 29,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Nếu một người lớn đe dọa rằng sẽ làm hại em hoặc gia đình nếu em kể chuyện, em nên làm gì?",
    options: [
      "Tìm một người lớn đáng tin cậy khác hoặc gọi Tổng đài 111 để nhờ giúp đỡ.",
      "Giữ bí mật vì sợ bị làm hại.",
      "Tự trốn đi một nơi khác."
    ],
    correctIndex: 0,
    explanation: "Lời đe dọa của kẻ xấu chỉ là để dọa nạt em. Khi em kể với người lớn hoặc công an, người lớn sẽ bảo vệ em và kẻ xấu sẽ bị trừng phạt.",
    ruleTip: "Lời đe dọa là giả - Người lớn và pháp luật sẽ luôn bảo vệ em!"
  },
  {
    id: 30,
    topicId: 3,
    topicName: "Nhận diện hành vi xâm hại",
    levelId: 3,
    monsterName: "Quái Vật Bí Mật Đen",
    question: "Nếu em từng bị ai đó đối xử không an toàn hoặc xâm phạm cơ thể, lỗi có phải do em không?",
    options: [
      "Không bao giờ là lỗi của em! Người thực hiện hành vi sai trái hoàn toàn chịu trách nhiệm.",
      "Có, lỗi tại em không cẩn thận.",
      "Lỗi tại em mặc quần áo đẹp."
    ],
    correctIndex: 0,
    explanation: "Ghi nhớ điều này nhé: Em là nạn nhân và em KHÔNG HỀ CÓ LỖI. Kẻ làm tổn thương trẻ em mới là người có tội và phải chịu trách nhiệm trước pháp luật.",
    ruleTip: "Em không bao giờ có lỗi khi bị xâm hại - Hãy dũng cảm chia sẻ!"
  },

  // --- CHỦ ĐỀ 4: BÍ MẬT VÀ DỤ DỖ (Câu 31–40) -> LEVEL 3 (Tiếp theo) ---
  {
    id: 31,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Bạn được bố mẹ tặng quà sinh nhật bí mật và dặn đợi đến tối mới mở. Đây có phải bí mật nguy hiểm không?",
    options: [
      "Không, đây là một bất ngờ vui vẻ và an toàn mang lại niềm vui.",
      "Có, bất kỳ bí mật nào cũng là nguy hiểm.",
      "Bí mật này phải báo công an ngay."
    ],
    correctIndex: 0,
    explanation: "Bí mật an toàn là những bí mật có thời hạn, mang lại niềm vui, tiếng cười cho mọi người (như món quà sinh nhật bí mật).",
    ruleTip: "Bí mật tốt mang lại nụ cười - Bí mật xấu mang lại nỗi sợ hãi!"
  },
  {
    id: 32,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Một người yêu cầu em giữ bí mật về một hành động khiến em sợ hãi hoặc đau đớn. Em nên làm gì?",
    options: [
      "Kể ngay với người đáng tin cậy mà em yêu quý.",
      "Tuyệt đối không nói với ai.",
      "Chỉ kể khi bị người khác tra hỏi."
    ],
    correctIndex: 0,
    explanation: "Khi một bí mật khiến em thấy đau đớn, lo sợ hay cắn rứt, đó là 'Bí mật độc hại'. Hãy nói ra ngay để được giải thoát.",
    ruleTip: "Phá vỡ bí mật độc hại bằng cách tâm sự với người lớn tin cậy!"
  },
  {
    id: 33,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Một người lạ tặng đồ chơi đẹp và rủ em đi theo họ để nhận thêm quà. Em nên làm gì?",
    options: [
      "Không đi theo, kiên quyết từ chối và chạy về phía người chăm sóc/bố mẹ.",
      "Đi theo vì đồ chơi đó rất đẹp.",
      "Rủ thêm bạn khác cùng đi theo người lạ."
    ],
    correctIndex: 0,
    explanation: "Tuyệt đối không bao giờ đi theo người lạ dù họ hứa hẹn cho kẹo ngon, đồ chơi xịn hay tiền bạc. Đó là chiếc bẫy nguy hiểm.",
    ruleTip: "Không nhận quà từ người lạ khi chưa có sự đồng ý của bố mẹ!"
  },
  {
    id: 34,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Một người lạ đến cổng trường nói rằng họ là bạn thân của bố mẹ và bảo em lên xe về cùng. Em nên làm gì?",
    options: [
      "Không tự ý đi theo, ở lại trường và báo ngay cho thầy cô/bảo vệ xác nhận với bố mẹ.",
      "Lên xe ngay vì sợ bố mẹ chờ lâu.",
      "Đi theo nếu xe của họ đẹp."
    ],
    correctIndex: 0,
    explanation: "Rất thông minh! Người lạ có thể giả làm người quen. Gia đình em nên có 'Mật khẩu gia đình'. Nếu họ không biết mật khẩu, tuyệt đối không đi theo!",
    ruleTip: "Hỏi mật khẩu gia đình và luôn nhờ thầy cô gọi điện cho bố mẹ!"
  },
  {
    id: 35,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Nếu một người hứa cho em chơi game điện thoại thoải mái nếu em chịu giữ bí mật một chuyện xấu, em nên làm gì?",
    options: [
      "Từ chối ngay lập tức và kể lại sự việc với người đáng tin cậy.",
      "Đồng ý chơi game một lúc rồi tính sau.",
      "Giữ bí mật để lần sau được chơi tiếp."
    ],
    correctIndex: 0,
    explanation: "Trò chơi điện tử hay bánh kẹo chỉ là mồi nhử. Không điều gì quý giá hơn sự an toàn và phẩm giá của em.",
    ruleTip: "Đừng để những mồi nhử ảo làm mờ mắt trước nguy cơ nguy hiểm!"
  },
  {
    id: 36,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Một người bảo em hãy nói dối bố mẹ để đi gặp họ ở một nơi riêng. Đây có phải dấu hiệu đáng lo ngại không?",
    options: [
      "Có, đây là dấu hiệu dụ dỗ cực kỳ nguy hiểm.",
      "Không, có thể họ muốn tạo bất ngờ thôi.",
      "Chỉ là chuyện bình thường của bạn bè."
    ],
    correctIndex: 0,
    explanation: "Bất kỳ ai yêu cầu em nói dối bố mẹ để đi gặp riêng họ đều có ý đồ xấu và nguy hiểm. Hãy từ chối và báo ngay cho bố mẹ.",
    ruleTip: "Ai bảo em 'Nói dối bố mẹ' -> Đó chắc chắn là kẻ xấu!"
  },
  {
    id: 37,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Nếu một người quen yêu cầu em đi vào nơi vắng vẻ, phòng kín mà không báo cho gia đình, em nên làm gì?",
    options: [
      "Không tự ý đi vào và chạy ra chỗ đông người hoặc báo người thân.",
      "Đi theo vì nghĩ người quen thì không làm hại mình.",
      "Đi theo nhưng đứng ở cửa."
    ],
    correctIndex: 0,
    explanation: "Không bao giờ vào phòng kín, góc khuất hay nơi vắng vẻ với bất kỳ ai nếu chưa được sự đồng ý của bố mẹ.",
    ruleTip: "Tránh xa những nơi vắng vẻ, góc khuất và phòng đóng kín!"
  },
  {
    id: 38,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Nếu ai đó khiến em cảm thấy có lỗi hoặc bảo em 'không ngoan' khi từ chối yêu cầu sai trái của họ, em có phải làm theo không?",
    options: [
      "Không, em không phải cảm thấy có lỗi khi bảo vệ bản thân.",
      "Có, phải nghe theo để làm người ngoan.",
      "Cố chịu đựng để họ không mắng."
    ],
    correctIndex: 0,
    explanation: "'Ngoan ngoãn' không đồng nghĩa với việc để người khác làm hại mình. Từ chối điều sai trái mới là hành động thông minh và dũng cảm.",
    ruleTip: "Bảo vệ bản thân không phải là hư - Đó là sự dũng cảm!"
  },
  {
    id: 39,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Người lớn đáng tin cậy có nên lắng nghe khi em kể về một điều khiến em sợ hãi không?",
    options: [
      "Có, người lớn có trách nhiệm sẽ lắng nghe, tin tưởng và bảo vệ em.",
      "Không, người lớn chỉ bận rộn không quan tâm đâu.",
      "Người lớn sẽ trách mắng em."
    ],
    correctIndex: 0,
    explanation: "Bố mẹ, thầy cô và những người lớn tốt bụng luôn sẵn sàng lắng nghe và che chở cho em khi em gặp khó khăn.",
    ruleTip: "Luôn có những người lớn yêu thương sẵn lòng bảo vệ em!"
  },
  {
    id: 40,
    topicId: 4,
    topicName: "Bí mật & Dụ dỗ",
    levelId: 3,
    monsterName: "Quái Vật Cái Bẫy",
    question: "Nếu người đầu tiên em kể chuyện không tin hoặc chưa giúp được em, em có nên tìm người đáng tin cậy khác không?",
    options: [
      "Có, hãy kiên trì tìm người lớn khác hoặc gọi Tổng đài 111 cho đến khi nhận được sự giúp đỡ.",
      "Không, hãy bỏ cuộc và cam chịu.",
      "Nghĩ rằng mọi người đều không muốn giúp mình."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Đôi khi người lớn bận hoặc chưa hiểu hết sự việc. Hãy kiên trì tìm một thầy cô khác, cô bác thân thiết hoặc gọi Tổng đài 111.",
    ruleTip: "Đừng bao giờ bỏ cuộc - Tiếp tục nói cho đến khi được an toàn!"
  },

  // --- CHỦ ĐỀ 5: AN TOÀN TRÊN INTERNET (Câu 41–50) -> LEVEL 4 ---
  {
    id: 41,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Một người lạ trên mạng xã hội hỏi xin địa chỉ nhà và trường học của em. Em có nên cung cấp không?",
    options: [
      "Không, tuyệt đối không tiết lộ thông tin cá nhân cho người lạ trên mạng.",
      "Có, để làm quen và bạn ấy đến nhà chơi.",
      "Gửi địa chỉ nhưng giấu số nhà."
    ],
    correctIndex: 0,
    explanation: "Địa chỉ nhà, trường học, số điện thoại là thông tin bảo mật. Kẻ xấu trên mạng có thể dùng thông tin đó để theo dõi hoặc lừa đảo.",
    ruleTip: "Bảo vệ thông tin cá nhân: Không địa chỉ, không số điện thoại!"
  },
  {
    id: 42,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Một người bạn quen trên mạng yêu cầu em chụp và gửi ảnh cá nhân riêng tư/nhạy cảm. Em nên làm gì?",
    options: [
      "Tuyệt đối không gửi, chặn tài khoản đó và báo ngay cho bố mẹ.",
      "Gửi một tấm để bạn xem rồi bảo bạn xóa đi.",
      "Gửi ảnh nếu bạn hứa tặng thẻ nạp game."
    ],
    correctIndex: 0,
    explanation: "Một khi bức ảnh được gửi lên mạng, em sẽ mất quyền kiểm soát và có thể bị kẻ xấu dùng để đe dọa, tống tiền. Tuyệt đối không gửi!",
    ruleTip: "Không chụp, không gửi ảnh riêng tư lên mạng dưới mọi hình thức!"
  },
  {
    id: 43,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Mặt Nạ",
    question: "Một người trên mạng có ảnh đại diện là bạn nhỏ dễ thương, tự nhận cùng trường nhưng em chưa gặp bao giờ. Em nên làm gì?",
    options: [
      "Không vội tin tưởng, không chia sẻ chuyện riêng tư và hỏi lại thầy cô hoặc bạn bè ở trường.",
      "Tin tưởng ngay vì ảnh đại diện rất hiền lành.",
      "Rủ bạn ấy đến nhà chơi ngay."
    ],
    correctIndex: 0,
    explanation: "Trên mạng, ai cũng có thể lấy ảnh người khác để tạo tài khoản giả mạo (Quái Vật Mặt Nạ). Đừng vội tin vào vẻ ngoài trên mạng.",
    ruleTip: "Thế giới mạng ảo - Tài khoản có thể là giả mạo!"
  },
  {
    id: 44,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Có nên chia sẻ mật khẩu tài khoản mạng xã hội hay tài khoản game cho bạn bè hoặc người lạ không?",
    options: [
      "Không, mật khẩu như chìa khóa nhà, chỉ có bố mẹ và em được biết.",
      "Có, chia sẻ để cùng chơi game cho vui.",
      "Cho bạn mượn mật khẩu thoải mái."
    ],
    correctIndex: 0,
    explanation: "Mật khẩu là chìa khóa bảo vệ tài khoản của em. Nếu chia sẻ, người khác có thể đánh cắp tài khoản hoặc mạo danh em để làm điều xấu.",
    ruleTip: "Mật khẩu là bí mật riêng tư - Giữ chặt như chìa khóa vàng!"
  },
  {
    id: 45,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Mặt Nạ",
    question: "Một người trên mạng yêu cầu em: 'Hãy giấu bố mẹ cuộc trò chuyện này, đây là bí mật riêng của chúng mình'. Em nên làm gì?",
    options: [
      "Báo ngay cho bố mẹ hoặc người lớn đáng tin cậy xem tin nhắn.",
      "Làm theo và xóa lịch sử trò chuyện để giấu bố mẹ.",
      "Tiếp tục nói chuyện nhưng tắt thông báo."
    ],
    correctIndex: 0,
    explanation: "Rất thông minh! Người lớn tốt sẽ không bao giờ bảo trẻ em giấu bố mẹ những cuộc trò chuyện trên mạng. Đó là cái bẫy nguy hiểm.",
    ruleTip: "Không giấu giếm phụ huynh các cuộc trò chuyện trên mạng!"
  },
  {
    id: 46,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Nếu nhận được tin nhắn hoặc video có nội dung bạo lực, nhạy cảm hoặc khiến em sợ hãi, em nên làm gì?",
    options: [
      "Không tiếp tục xem/tương tác, tắt màn hình và đưa cho bố mẹ xử lý.",
      "Chuyển tiếp cho các bạn trong lớp cùng xem.",
      "Cố xem hết rồi tự khóc một mình."
    ],
    correctIndex: 0,
    explanation: "Hãy tắt ngay màn hình và gọi bố mẹ. Em không có lỗi khi vô tình thấy những thứ xấu, người lớn sẽ giúp em chặn nội dung độc hại đó.",
    ruleTip: "Gặp nội dung xấu trên mạng: Dừng xem -> Đưa người lớn xử lý!"
  },
  {
    id: 47,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Em có nên nhấn vào đường link lạ được người không quen gửi với lời hứa: 'Bấm vào đây để nhận 1.000 Robux/Kim Cương miễn phí' không?",
    options: [
      "Không bấm vào, vì đây là đường link lừa đảo chứa mã độc hoặc đánh cắp tài khoản.",
      "Bấm ngay để nhận quà miễn phí.",
      "Bấm thử xem có thật không."
    ],
    correctIndex: 0,
    explanation: "Trên mạng không có món quà nào miễn phí cả. Đó là những đường link lừa đảo có thể làm hỏng máy tính hoặc cướp tài khoản.",
    ruleTip: "Cảnh giác với link lạ: Không bấm - Không tải về!"
  },
  {
    id: 48,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Nếu có kẻ trên mạng đe dọa tung ảnh riêng tư hoặc đòi tiền em, em nên làm gì?",
    options: [
      "Không làm theo yêu cầu của kẻ xấu, chụp màn hình lưu chứng cứ và báo ngay cho bố mẹ, công an.",
      "Vội vàng gửi tiền hoặc nghe theo mọi lời kẻ đó bảo.",
      "Xóa mọi thứ và trốn một mình trong phòng."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Kẻ tống tiền sẽ không dừng lại nếu em nghe theo. Cách duy nhất là báo cho người lớn và cơ quan chức năng để can thiệp kịp thời.",
    ruleTip: "Bị đe dọa trên mạng: Không nghe lời kẻ xấu -> Báo ngay cho người lớn!"
  },
  {
    id: 49,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Mặt Nạ",
    question: "Một người quen trên mạng muốn hẹn gặp riêng em ngoài đời và dặn 'Không được cho bố mẹ biết nhé'. Em nên làm gì?",
    options: [
      "Tuyệt đối không đồng ý đi gặp và báo ngay cho bố mẹ biết.",
      "Tự mình đến điểm hẹn xem người đó là ai.",
      "Rủ một bạn nhỏ nữa đi cùng cho an tâm."
    ],
    correctIndex: 0,
    explanation: "Chuẩn xác 100%! Gặp người trên mạng ngoài đời mà không có bố mẹ đi cùng là vô cùng nguy hiểm. Nhiều vụ bắt cóc đã xảy ra từ những cái bẫy này.",
    ruleTip: "Tuyệt đối không gặp riêng người quen trên mạng ngoài đời thực!"
  },
  {
    id: 50,
    topicId: 5,
    topicName: "An toàn trên Internet",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Khi sử dụng mạng xã hội, em có nên bật chia sẻ vị trí trực tiếp (Check-in thời gian thực) ở chế độ công khai không?",
    options: [
      "Không, vì kẻ xấu có thể biết chính xác em đang ở đâu một mình.",
      "Có, để khoe với mọi người mình đang đi chơi.",
      "Bật định vị suốt ngày đêm."
    ],
    correctIndex: 0,
    explanation: "Chia sẻ vị trí trực tiếp công khai cho người lạ biết lộ trình đi lại của em, tạo điều kiện cho kẻ xấu tiếp cận ngoài đời thực.",
    ruleTip: "Tắt định vị công khai để giữ an toàn nơi chốn của em!"
  },

  // --- CHỦ ĐỀ 6: BẮT NẠT VÀ BẠO LỰC (Câu 51–60) -> LEVEL 5 ---
  {
    id: 51,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Một bạn thường xuyên gọi em bằng những biệt danh xấu xí, xúc phạm khiến em buồn và khóc. Đây có phải hành vi bắt nạt không?",
    options: [
      "Có, đây là hành vi bắt nạt bằng lời nói (xúc phạm nhân phẩm) gây tổn thương tâm lý.",
      "Không, bạn chỉ đang đùa vui một chút thôi.",
      "Là do em quá yếu đuối thôi."
    ],
    correctIndex: 0,
    explanation: "Lời nói đùa chỉ đúng khi cả hai cùng cười. Nếu lời nói lặp đi lặp lại khiến người khác đau khổ, đó chính là bắt nạt bằng lời nói.",
    ruleTip: "Lời nói gây tổn thương lặp lại chính là hành vi bắt nạt!"
  },
  {
    id: 52,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Nếu có bạn cùng trường xô đẩy hoặc đánh em, em nên làm gì trước tiên?",
    options: [
      "Tìm cách né tránh, chạy đến nơi an toàn đông người và báo ngay cho thầy cô/giám thị.",
      "Đứng im để bạn đánh cho xong chuyện.",
      "Lấy vũ khí sắc nhọn để đánh lại."
    ],
    correctIndex: 0,
    explanation: "Rất đúng! An toàn thân thể là số 1. Hãy thoát khỏi tầm tay của kẻ bạo lực và tìm ngay người có thẩm quyền can thiệp.",
    ruleTip: "Ưu tiên an toàn: Thoát khỏi bạo lực -> Tìm người lớn can thiệp!"
  },
  {
    id: 53,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Em có nên chủ động dùng bạo lực đánh trả để trả thù khi bị bắt nạt không?",
    options: [
      "Không nên chủ động dùng bạo lực; hãy tự vệ nếu cần rồi nhanh chóng rời đi và nhờ thầy cô, pháp luật xử lý.",
      "Nên tập hợp băng nhóm để trả thù lớn hơn.",
      "Đánh lén bạn lúc bạn không để ý."
    ],
    correctIndex: 0,
    explanation: "Dùng bạo lực đáp trả bạo lực chỉ làm vấn đề tồi tệ hơn và có thể khiến em bị thương nặng hoặc vi phạm nội quy. Hãy để nhà trường giải quyết.",
    ruleTip: "Giải quyết mâu thuẫn bằng sự thông minh và quy định, không bằng bạo lực!"
  },
  {
    id: 54,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Nếu thấy một bạn trong lớp đang bị nhóm khác vây quanh bắt nạt hoặc chê cười, em nên làm gì?",
    options: [
      "Báo ngay cho thầy cô giáo hoặc người lớn phụ trách, và nếu an toàn, hãy lên tiếng bênh vực bạn.",
      "Đứng xem và quay video đăng lên mạng xã hội.",
      "Cùng vào hùa chê cười bạn cho vui."
    ],
    correctIndex: 0,
    explanation: "Rất dũng cảm và nhân ái! Người đứng xem hùa theo cũng tiếp tay cho bạo lực. Trở thành người bảo vệ bạn bằng cách gọi thầy cô giúp đỡ.",
    ruleTip: "Không thờ ơ trước bạo lực - Giúp bạn bằng cách gọi thầy cô!"
  },
  {
    id: 55,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Một bạn liên tục nhắn tin chửi bới, dọa nạt em trong nhóm chat lớp học. Em nên làm gì?",
    options: [
      "Không chửi bới lại, chụp lại tin nhắn làm bằng chứng và đưa cho bố mẹ, giáo viên chủ nhiệm.",
      "Nhắn tin chửi lại thật thậm tệ.",
      "Xóa nhóm chat rồi im lặng chịu đựng."
    ],
    correctIndex: 0,
    explanation: "Giữ bình tĩnh, không chửi bới lại và lưu giữ bằng chứng hình ảnh để nhà trường và phụ huynh có căn cứ xử lý nghiêm minh.",
    ruleTip: "Lưu bằng chứng bắt nạt trên mạng - Không đáp trả bằng lời độc hại!"
  },
  {
    id: 56,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Có được phép ép bạn bè làm những việc bạn ấy không muốn (như làm bài tập hộ, trực nhật hộ, nộp tiền) không?",
    options: [
      "Tuyệt đối không, đó là hành vi ức hiếp và bóc lột bạn bè.",
      "Được nếu mình là lớp trưởng hoặc to con hơn.",
      "Được nếu bạn ấy hiền lành không dám cãi."
    ],
    correctIndex: 0,
    explanation: "Mọi người đều bình đẳng. Ép buộc người khác làm việc cho mình bằng sự đe dọa là hành vi xấu cần bị xử lý.",
    ruleTip: "Tôn trọng bạn bè - Không ép buộc, không ức hiếp ai!"
  },
  {
    id: 57,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Nếu có bạn to lớn hơn đe dọa đòi lấy tiền ăn sáng hoặc đồ dùng học tập của em, em nên làm gì?",
    options: [
      "Ưu tiên giữ an toàn thân thể của mình, sau đó báo ngay cho bố mẹ và nhà trường.",
      "Ngày nào cũng mang tiền nộp cho bạn để được yên thân.",
      "Lấy trộm tiền của bố mẹ để đưa cho bạn."
    ],
    correctIndex: 0,
    explanation: "Thân thể em là quý nhất. Không đôi co tại chỗ nếu đối phương quá hung hãn, nhưng PHẢI BÁO NGAY để nhà trường ngăn chặn kịp thời.",
    ruleTip: "Đừng nộp tiền cho kẻ trấn lột - Báo ngay cho thầy cô và cha mẹ!"
  },
  {
    id: 58,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Hành vi chế ảnh, nói xấu bạn trên mạng xã hội (Cyberbullying) có gây tổn thương cho bạn không?",
    options: [
      "Có, tổn thương tinh thần trên mạng cũng đau đớn như vết thương thể xác.",
      "Không, chỉ là trên mạng thôi không có thật.",
      "Bạn bè trêu nhau trên mạng là chuyện bình thường."
    ],
    correctIndex: 0,
    explanation: "Bắt nạt trên mạng để lại những vết thương tâm lý sâu sắc khiến nhiều bạn rơi vào trầm cảm. Chúng ta phải cùng nhau nói không với điều này.",
    ruleTip: "Không chế giễu bạn trên mạng - Lời nói tử tế tạo nên tình bạn đẹp!"
  },
  {
    id: 59,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Nếu thấy bạn bè chia sẻ hình ảnh riêng tư hoặc đáng xấu hổ của bạn khác để chế giễu, em nên làm gì?",
    options: [
      "Không chia sẻ tiếp, yêu cầu các bạn dừng lại và báo cho giáo viên.",
      "Thả tim và chia sẻ tiếp cho mọi người cùng cười.",
      "Bình luận thêm lời cay độc vào ảnh."
    ],
    correctIndex: 0,
    explanation: "Rất tuyệt vời! Chặn đứng chuỗi lây lan của thông tin xấu là hành động của một Hiệp sĩ chân chính. Hãy bảo vệ bạn như bảo vệ chính mình.",
    ruleTip: "Dừng lan truyền hình ảnh xấu - Lan tỏa sự bảo vệ và cảm thông!"
  },
  {
    id: 60,
    topicId: 6,
    topicName: "Phòng chống bắt nạt",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Nếu em bị bắt nạt, em có nên im lặng vì sợ bị bạn bè chê là 'mách lẻo' hay 'yếu đuối' không?",
    options: [
      "Không, lên tiếng tìm sự giúp đỡ là quyền hợp pháp và là hành động dũng cảm nhất.",
      "Nên im lặng để tỏ ra mình chịu đựng giỏi.",
      "Nghỉ học ở nhà luôn không đi học nữa."
    ],
    correctIndex: 0,
    explanation: "Rất đúng! Báo cáo sự việc để bảo vệ sự an toàn cho bản thân và môi trường học đường không phải là 'mách lẻo', mà là hành động của người dũng cảm.",
    ruleTip: "Lên tiếng bảo vệ sự thật - Em không hề đơn độc!"
  },

  // --- CHỦ ĐỀ 7: AN TOÀN KHI Ở NHÀ VÀ NGOÀI XÃ HỘI (Câu 61–70) -> LEVEL 6 ---
  {
    id: 61,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu chẳng may bị lạc bố mẹ ở siêu thị, công viên hoặc nơi đông người, em nên tìm ai để nhờ giúp đỡ?",
    options: [
      "Nhân viên an ninh, nhân viên mặc đồng phục tại quầy thông tin hoặc người phụ nữ dắt theo con nhỏ.",
      "Đi theo bất kỳ người lạ nào bảo sẽ dẫn em đi tìm bố mẹ.",
      "Đi lang thang ra bãi giữ xe hoặc ngoài đường vắng."
    ],
    correctIndex: 0,
    explanation: "Hãy đứng nguyên tại chỗ hoặc tìm chú bảo vệ có đồng phục, nhân viên quầy thu ngân nhờ phát loa thông báo tìm phụ huynh.",
    ruleTip: "Khi bị lạc: Đứng ở nơi sáng sủa -> Tìm nhân viên đồng phục/bảo vệ!"
  },
  {
    id: 62,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu có người lạ đề nghị chở em về nhà trên xe máy hoặc ô tô, em nên làm gì?",
    options: [
      "Kiên quyết từ chối: 'Cháu cảm ơn, nhưng cháu đợi bố mẹ đón', và lùi ra xa.",
      "Lên xe ngay để về nhà cho nhanh.",
      "Lên xe nếu người đó cho kẹo ngon."
    ],
    correctIndex: 0,
    explanation: "Không bao giờ bước lên xe của người lạ trong bất kỳ tình huống nào nếu không có sự xác nhận trực tiếp từ bố mẹ.",
    ruleTip: "Tuyệt đối không bước lên xe người lạ!"
  },
  {
    id: 63,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Khi ở nhà một mình và có người bấm chuông tự xưng là thợ sửa ống nước hoặc giao hàng, em nên làm gì?",
    options: [
      "Không mở cửa, khóa cửa cẩn thận và nói vọng ra bảo họ quay lại khi có bố mẹ, đồng thời gọi điện cho bố mẹ.",
      "Mở toang cửa mời họ vào nhà ngồi đợi.",
      "Đi trốn và khóc toáng lên."
    ],
    correctIndex: 0,
    explanation: "Khi ở nhà một mình, cửa luôn phải khóa. Tuyệt đối không mở cửa cho bất kỳ ai không phải là bố mẹ hoặc người thân có chìa khóa.",
    ruleTip: "Ở nhà một mình: Khóa cửa chắc chắn - Không mở cửa cho người lạ!"
  },
  {
    id: 64,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu cảm thấy có người đang đi theo sau mình trên đường vắng, em nên làm gì?",
    options: [
      "Nhanh chóng rẽ sang đường có ánh sáng, chạy vào cửa hàng/quán xá đông người và cầu cứu.",
      "Đi chậm lại đợi người đó đến gần.",
      "Rẽ vào ngõ hẹp và tối để trốn."
    ],
    correctIndex: 0,
    explanation: "Nơi đông người và có ánh sáng là nơi an toàn. Hãy chạy ngay vào tiệm tạp hóa, quán ăn và nói với nhân viên: 'Có người theo dõi cháu, xin hãy giúp cháu!'.",
    ruleTip: "Bị theo dõi -> Chạy ngay vào nơi đông người và sáng sủa!"
  },
  {
    id: 65,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Khi đi chơi cùng bạn bè sau giờ học, em có cần xin phép và báo cho bố mẹ biết địa điểm không?",
    options: [
      "Có, luôn phải xin phép và thông báo rõ đi đâu, với ai và khi nào về.",
      "Không cần, đi chơi một chút rồi về không sao.",
      "Chỉ cần nói dối là đi học thêm."
    ],
    correctIndex: 0,
    explanation: "Rất đúng! Bố mẹ cần biết em ở đâu để kịp thời bảo vệ và hỗ trợ khi xảy ra sự cố khẩn cấp.",
    ruleTip: "Luôn xin phép và thông báo địa điểm cho bố mẹ trước khi đi!"
  },
  {
    id: 66,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu người thân hoặc người quen có hành động nựng nịu, ôm hôn khiến em khó chịu, em có được từ chối không?",
    options: [
      "Có, em có toàn quyền bày tỏ sự không thoải mái và từ chối một cách lễ phép.",
      "Không, phải để người thân ôm hôn vì họ là người lớn.",
      "Phải cố chịu đựng vì sợ bị mắng là không ngoan."
    ],
    correctIndex: 0,
    explanation: "Dù là họ hàng hay người quen, tình cảm phải dựa trên sự thoải mái của cả hai phía. Em có thể khoanh tay chào thay vì để người khác hôn má.",
    ruleTip: "Em có quyền nói không với những cái ôm hôn gây khó chịu!"
  },
  {
    id: 67,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu chẳng may bị lạc đường, em có nên tự ý đi vào ngõ cụt, bụi rậm hoặc công trường vắng vẻ để tìm đường không?",
    options: [
      "Không, tuyệt đối tránh nơi hoang vắng, hãy đứng ở trục đường chính có nhiều người qua lại.",
      "Nên đi vào ngõ tối để không ai nhìn thấy.",
      "Cứ đi đại xem đến đâu thì đến."
    ],
    correctIndex: 0,
    explanation: "Nơi vắng vẻ, công trường tiềm ẩn nguy cơ tai nạn và người xấu. Hãy đứng ở nơi sáng sủa, đông người qua lại.",
    ruleTip: "Ở nơi sáng và đông người để mọi người dễ dàng nhìn thấy và hỗ trợ em!"
  },
  {
    id: 68,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu có người nắm tay kéo em đi trái ý muốn, em nên phản ứng như thế nào?",
    options: [
      "Ngồi sụp xuống, quẫy đạp mạnh và hét thật lớn: 'CỨU CHÁU VỚI! CHÁU KHÔNG QUEN NGƯỜI NÀY!'.",
      "Đi theo ngoan ngoãn vì sợ bị đau tay.",
      "Im lặng không nói gì."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Hét rõ câu 'CHÁU KHÔNG QUEN NGƯỜI NÀY' sẽ giúp người đi đường phân biệt được đây là bắt cóc chứ không phải bố mẹ đang dạy dỗ con.",
    ruleTip: "Kỹ năng thoát hiểm: Ngồi thụp xuống + Hét to 'CHÁU KHÔNG QUEN NGƯỜI NÀY'!"
  },
  {
    id: 69,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu em bị thương, bị ngã xe hoặc gặp nguy hiểm ngoài đường, em nên làm gì?",
    options: [
      "Nhờ người lớn xung quanh hoặc chú công an, gọi số 115 (cấp cứu) và gọi cho bố mẹ.",
      "Cố chịu đau tự lết về nhà.",
      "Giấu kín vết thương vì sợ bị mắng."
    ],
    correctIndex: 0,
    explanation: "Hãy nhờ sự trợ giúp của người đi đường để sơ cứu hoặc đưa đến trạm y tế gần nhất, và báo ngay cho gia đình.",
    ruleTip: "Gặp tai nạn: Giữ bình tĩnh -> Nhờ người lớn hỗ trợ y tế ngay!"
  },
  {
    id: 70,
    topicId: 7,
    topicName: "An toàn xã hội & Thoát hiểm",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Em có nên học thuộc lòng số điện thoại của bố mẹ và địa chỉ nhà mình không?",
    options: [
      "Có, đây là kỹ năng sinh tồn vô cùng quan trọng mà mọi bạn nhỏ cần ghi nhớ.",
      "Không cần nhớ, lúc nào cần thì hỏi người khác.",
      "Chỉ cần nhớ tên bạn bè cùng lớp thôi."
    ],
    correctIndex: 0,
    explanation: "Nhớ số điện thoại của bố hoặc mẹ và địa chỉ nhà sẽ giúp chú công an hoặc người tốt liên lạc với gia đình em ngay khi cần thiết.",
    ruleTip: "Học thuộc ít nhất một số điện thoại của bố mẹ để phòng nguy cấp!"
  },

  // --- CHỦ ĐỀ 8: NHẬN BIẾT CẢM XÚC VÀ TÌM KIẾM SỰ GIÚP ĐỠ (Câu 71–80) -> LEVEL 6 (Tiếp theo) ---
  {
    id: 71,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu cảm thấy sợ hãi, bồn chồn hoặc rùng mình khi ở cạnh một ai đó, em có nên nói ra cảm giác này không?",
    options: [
      "Có, hãy chia sẻ ngay cảm giác đó với bố mẹ hoặc người em tin tưởng nhất.",
      "Không, giữ kín trong lòng vì sợ người khác cười chê.",
      "Nghĩ là do mình tưởng tượng linh tinh."
    ],
    correctIndex: 0,
    explanation: "Trực giác của cơ thể cảnh báo cho em về sự an toàn. Đừng bao giờ phớt lờ cảm giác sợ hãi của chính mình.",
    ruleTip: "Cảm xúc sợ hãi là tín hiệu cảnh báo - Hãy lắng nghe và chia sẻ!"
  },
  {
    id: 72,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu có chuyện khiến em buồn hoặc bối rối nhưng chưa biết cách diễn đạt thành lời, em có thể làm gì?",
    options: [
      "Vẽ tranh, viết ra giấy hoặc nhờ người lớn kiên nhẫn lắng nghe từng chút một.",
      "Giữ im lặng và chịu đựng một mình mãi mãi.",
      "Đập phá đồ đạc trong nhà."
    ],
    correctIndex: 0,
    explanation: "Em có thể dùng hình vẽ, mẩu giấy nhỏ hoặc chỉ cần nói: 'Mẹ ơi, con có chuyện này khó nói quá, mẹ nghe con nhé'. Người lớn sẽ kiên nhẫn hiểu em.",
    ruleTip: "Có nhiều cách để chia sẻ: Nói, viết ra giấy hoặc vẽ tranh!"
  },
  {
    id: 73,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Khi gặp chuyện nguy hiểm hoặc bị xâm hại, ai là người em nên tìm đến đầu tiên?",
    options: [
      "Bố mẹ, thầy cô giáo hoặc người lớn đáng tin cậy trong gia đình.",
      "Người lạ ngoài đường.",
      "Bạn bè chơi game quen trên mạng."
    ],
    correctIndex: 0,
    explanation: "Hãy lập danh sách '5 người lớn đáng tin cậy nhất' trong cuộc đời em (như bố, mẹ, cô giáo, ông bà, dì) để tìm đến bất cứ khi nào cần.",
    ruleTip: "Vòng tròn 5 người tin cậy: Luôn có những người sẵn sàng che chở em!"
  },
  {
    id: 74,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu người làm em sợ hãi lại là một người quen hoặc người thân trong họ hàng, em có được kể với người khác không?",
    options: [
      "Có, em hoàn toàn có quyền kể với bố mẹ hoặc người lớn khác mà em tin cậy.",
      "Không, người thân thì phải tuyệt đối giấu kín.",
      "Nếu kể sẽ làm xấu hổ cả nhà nên phải im lặng."
    ],
    correctIndex: 0,
    explanation: "Hành vi sai trái không thể được bao che bởi mối quan hệ họ hàng. An toàn của em là trên hết, em luôn có quyền lên tiếng.",
    ruleTip: "Dù là ai đi nữa, hành vi sai trái đều không được phép tồn tại!"
  },
  {
    id: 75,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu em cảm thấy xấu hổ hoặc lo sợ bị mắng khi kể lại một sự việc không an toàn, em có nên im lặng mãi không?",
    options: [
      "Không, người lớn tốt bụng sẽ luôn thấu hiểu, không trách mắng và giúp em vượt qua.",
      "Nên im lặng suốt đời.",
      "Chỉ kể khi lớn lên thành người lớn."
    ],
    correctIndex: 0,
    explanation: "Nỗi sợ hãi và xấu hổ sẽ tan biến khi em được người lớn ôm vào lòng và che chở. Em không làm gì sai nên không có gì phải xấu hổ.",
    ruleTip: "Chia sẻ là bước đầu tiên để em cảm thấy nhẹ nhõm và an toàn!"
  },
  {
    id: 76,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Khi bị người xấu đe dọa và bắt em thề phải giữ bí mật, em có phải giữ lời hứa đó không?",
    options: [
      "Không bao giờ! Lời hứa bị ép buộc bởi kẻ xấu không có giá trị và em phải phá vỡ nó ngay.",
      "Phải giữ lời hứa vì một khi đã hứa là không được thất hứa.",
      "Giữ bí mật để kẻ xấu không tức giận."
    ],
    correctIndex: 0,
    explanation: "Tuyệt đối chính xác! Lời hứa bảo vệ kẻ xấu là lời hứa nguy hiểm. Phá vỡ lời hứa đó để tự cứu mình là hành động đúng đắn và dũng cảm.",
    ruleTip: "Không bao giờ có nghĩa vụ giữ lời hứa với kẻ đe dọa em!"
  },
  {
    id: 77,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu bố mẹ vắng nhà hoặc đi công tác xa, em có thể tìm thầy cô giáo hoặc nhân viên y tế trường để nhờ giúp đỡ không?",
    options: [
      "Có, thầy cô và nhân viên trường học là những người có trách nhiệm bảo vệ học sinh.",
      "Không, chỉ có bố mẹ mới được giúp.",
      "Tự mình giải quyết mọi chuyện."
    ],
    correctIndex: 0,
    explanation: "Thầy cô, ban giám hiệu và phòng tư vấn tâm lý học đường luôn sẵn sàng lắng nghe và bảo vệ quyền lợi của em.",
    ruleTip: "Thầy cô giáo luôn là lá chắn tin cậy của em tại trường học!"
  },
  {
    id: 78,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu người lớn đầu tiên em kể chuyện không lắng nghe hoặc bảo 'Trẻ con đừng vẽ chuyện', em nên làm gì?",
    options: [
      "Tiếp tục tìm một người đáng tin cậy khác hoặc gọi Tổng đài 111 để được hỗ trợ chuyên nghiệp.",
      "Bỏ cuộc và chấp nhận không ai tin mình.",
      "Tự giam mình trong phòng khóc."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Đôi khi có người chưa nhận thức được mức độ nghiêm trọng. Hãy chuyển sang người tiếp theo trong danh sách tin cậy hoặc gọi 111.",
    ruleTip: "Luôn có người lắng nghe em - Tiếp tục tìm kiếm cho đến khi an toàn!"
  },
  {
    id: 79,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Nếu một tình huống khiến em cảm thấy bất an, em có cần phải có bằng chứng rõ ràng mới được tìm người giúp không?",
    options: [
      "Không cần, chỉ cần em cảm thấy không an toàn là em đã có quyền yêu cầu sự giúp đỡ ngay lập tức.",
      "Phải có hình ảnh, video chứng minh mới được kêu cứu.",
      "Chờ bị hại rồi mới được gọi người giúp."
    ],
    correctIndex: 0,
    explanation: "Phòng ngừa trước khi xảy ra là điều quan trọng nhất. Cảm giác bất an của em là đủ lý do để tìm sự bảo vệ.",
    ruleTip: "Cảm thấy bất an là lý do chính đáng để tìm sự giúp đỡ ngay!"
  },
  {
    id: 80,
    topicId: 8,
    topicName: "Cảm xúc & Tìm kiếm trợ giúp",
    levelId: 6,
    monsterName: "Quái Vật Bóng Đêm",
    question: "Khi kể lại một sự việc khiến em sợ hãi, em có cần phải nhớ chính xác 100% mọi chi tiết không?",
    options: [
      "Không, em chỉ cần kể những gì mình nhớ và cảm nhận được, không cần áp lực phải nhớ hết.",
      "Phải nhớ chính xác từng giây từng phút nếu không sẽ không ai tin.",
      "Phải bịa thêm chuyện cho sinh động."
    ],
    correctIndex: 0,
    explanation: "Khi sợ hãi, trí nhớ của trẻ em có thể bị ngắt quãng. Người lớn chuyên môn sẽ hiểu và giúp em ghép lại câu chuyện mà không phán xét.",
    ruleTip: "Kể những gì em nhớ - Người lớn sẽ luôn bên cạnh em!"
  },

  // --- CHỦ ĐỀ 9: QUYỀN RIÊNG TƯ VÀ TÔN TRỌNG NGƯỜI KHÁC (Câu 81–90) -> LEVEL 2 & 5 ---
  {
    id: 81,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Em có được tự ý lấy điện thoại của bố mẹ, bạn bè hoặc người khác để mở xem tin nhắn riêng tư không?",
    options: [
      "Không, đó là xâm phạm quyền riêng tư của người khác, cần phải xin phép trước.",
      "Được xem thoải mái nếu máy không khóa mật khẩu.",
      "Tự ý xem rồi kể cho người khác nghe."
    ],
    correctIndex: 0,
    explanation: "Muốn người khác tôn trọng sự riêng tư của mình, chính em cũng cần tôn trọng điện thoại, thư từ và đồ dùng của người khác.",
    ruleTip: "Tôn trọng quyền riêng tư của người khác như chính cơ thể mình!"
  },
  {
    id: 82,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Có được chụp ảnh hoặc quay phim bạn bè khi bạn ấy chưa đồng ý hoặc đang thay đồ không?",
    options: [
      "Tuyệt đối không nên, đó là hành vi xâm phạm đời tư và bất lịch sự.",
      "Được chụp nếu thấy vui mắt.",
      "Chụp lén rồi mang khoe với người khác."
    ],
    correctIndex: 0,
    explanation: "Chụp ảnh người khác khi chưa có sự đồng ý, đặc biệt là lúc bạn đang sơ ý, là hành vi thiếu tôn trọng và vi phạm đạo đức.",
    ruleTip: "Luôn xin phép trước khi chụp ảnh người khác!"
  },
  {
    id: 83,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 4,
    monsterName: "Quái Vật Chiếc Điện Thoại",
    question: "Em có nên xin phép bạn bè trước khi đăng ảnh của bạn lên Facebook hoặc mạng xã hội không?",
    options: [
      "Có, cần hỏi ý kiến bạn: 'Tớ đăng bức ảnh này lên mạng có được không?'.",
      "Không cần, ảnh trong máy mình thích đăng lúc nào thì đăng.",
      "Cứ đăng ảnh dìm hàng bạn để câu like."
    ],
    correctIndex: 0,
    explanation: "Bạn có quyền quyết định hình ảnh của mình có xuất hiện trên mạng hay không. Luôn tôn trọng quyết định của bạn.",
    ruleTip: "Hỏi ý kiến bạn trước khi chia sẻ hình ảnh lên không gian mạng!"
  },
  {
    id: 84,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Có được đem ngoại hình, cân nặng, làn da hoặc khiếm khuyết của bạn ra chế giễu không?",
    options: [
      "Tuyệt đối không! Mỗi người đều đẹp theo cách riêng và xứng đáng được tôn trọng.",
      "Được trêu chọc nếu cả lớp cùng cười.",
      "Chỉ trêu những bạn không phản kháng."
    ],
    correctIndex: 0,
    explanation: "Rất văn minh! 'Body Shaming' (chế giễu ngoại hình) để lại vết thương lòng sâu sắc. Hãy luôn dùng những lời khen ngợi và động viên nhau.",
    ruleTip: "Tôn trọng sự đa dạng ngoại hình - Không chế giễu bất kỳ ai!"
  },
  {
    id: 85,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Bạn bè có quyền từ chối một cái ôm hoặc cái nắm tay từ em không?",
    options: [
      "Có, bạn cũng có ranh giới cơ thể giống như em và em phải tôn trọng điều đó.",
      "Không, là bạn bè thì phải cho ôm.",
      "Nếu bạn từ chối thì giận dỗi không chơi nữa."
    ],
    correctIndex: 0,
    explanation: "Tôn trọng ranh giới cơ thể là quy tắc hai chiều: Em có quyền từ chối người khác, và người khác cũng có quyền từ chối em.",
    ruleTip: "Tôn trọng câu trả lời 'KHÔNG' của người khác!"
  },
  {
    id: 86,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Nếu bạn đã nói KHÔNG với một trò chơi, em có nên tiếp tục lôi kéo, ép buộc bạn không?",
    options: [
      "Không, khi bạn đã nói Không thì em cần dừng lại ngay.",
      "Tiếp tục ép cho đến khi bạn đồng ý mới thôi.",
      "Chê bạn là nhút nhát để ép bạn chơi."
    ],
    correctIndex: 0,
    explanation: "Một người bạn chân chính luôn tôn trọng sự thoải mái của bạn mình và không bao giờ ép buộc.",
    ruleTip: "Dừng lại ngay khi bạn nói KHÔNG!"
  },
  {
    id: 87,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 2,
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    question: "Có được tự ý lục lọi ba lô, đọc trộm nhật ký riêng tư của người khác không?",
    options: [
      "Không, đó là tài sản cá nhân và bí mật riêng tư cần được tôn trọng.",
      "Được xem nếu bạn để quên trên bàn.",
      "Mở ra xem rồi đọc to cho cả lớp nghe."
    ],
    correctIndex: 0,
    explanation: "Nhật ký và đồ đạc cá nhân là thế giới riêng tư của mỗi người. Không bao giờ được xâm phạm khi chưa được cho phép.",
    ruleTip: "Nhật ký và đồ dùng cá nhân là bất khả xâm phạm!"
  },
  {
    id: 88,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 1,
    monsterName: "Quái Vật Bàn Tay Xấu",
    question: "Em có nên tôn trọng sự khác biệt tự nhiên giữa bé trai và bé gái không?",
    options: [
      "Có, các bạn trai và bạn gái đều bình đẳng, đáng quý và cần tôn trọng ranh giới của nhau.",
      "Không, bạn trai luôn hơn bạn gái.",
      "Bạn gái không được tham gia các hoạt động thể thao."
    ],
    correctIndex: 0,
    explanation: "Bé trai và bé gái đều có những đặc điểm cơ thể riêng biệt cần được giữ gìn và tôn trọng bình đẳng như nhau.",
    ruleTip: "Bình đẳng giới - Mọi bạn nhỏ đều đáng yêu và đáng được tôn trọng!"
  },
  {
    id: 89,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 5,
    monsterName: "Quái Vật Lời Nói Độc",
    question: "Khi bạn tin tưởng kể cho em một chuyện riêng tư gia đình, em có nên đem chuyện đó ra làm trò cười cho lớp không?",
    options: [
      "Tuyệt đối không, giữ kín bí mật của bạn là thể hiện lòng trung thực và sự tôn trọng.",
      "Kể cho các bạn khác nghe để có chuyện buôn dưa lê.",
      "Đăng lên mạng xã hội để chế giễu."
    ],
    correctIndex: 0,
    explanation: "Sự tin tưởng của bạn bè là món quà vô giá. Không bao giờ đem nỗi buồn hoặc chuyện riêng của bạn ra làm trò đùa.",
    ruleTip: "Giữ niềm tin - Không đem chuyện riêng của bạn làm trò cười!"
  },
  {
    id: 90,
    topicId: 9,
    topicName: "Quyền riêng tư & Tôn trọng",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Tôn trọng cơ thể của người khác có quan trọng như bảo vệ cơ thể của chính mình không?",
    options: [
      "Có, hai điều này quan trọng ngang nhau trong việc xây dựng một xã hội an toàn, văn minh.",
      "Không, chỉ cần bảo vệ mình là đủ, người khác sao cũng được.",
      "Không quan tâm đến người khác."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Một thế giới an toàn chỉ hình thành khi mỗi người chúng ta vừa biết tự bảo vệ mình, vừa biết tôn trọng ranh giới của mọi người xung quanh.",
    ruleTip: "Bảo vệ mình và Tôn trọng người khác - Tinh thần của Safety Hero!"
  },

  // --- CHỦ ĐỀ 10: THỬ THÁCH TỔNG HỢP – SAFETY HERO (Câu 91–100) -> LEVEL 7 ---
  {
    id: 91,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Một người lạ yêu cầu em đi theo họ vào chỗ vắng để giúp tìm một chú mèo con bị lạc. Em nên làm gì?",
    options: [
      "Không đi theo, nói to: 'Cháu không đi được, chú hãy nhờ người lớn giúp ạ' và chạy về chỗ đông người.",
      "Đi theo giúp đỡ vì em rất yêu quý mèo con.",
      "Tự mình đi tìm mèo con cho chú."
    ],
    correctIndex: 0,
    explanation: "Người lớn thực sự khi cần giúp đỡ sẽ tìm người lớn khác, không bao giờ nhờ một đứa trẻ đi vào chỗ vắng. Đó là cái bẫy dụ dỗ phổ biến.",
    ruleTip: "Người lớn cần giúp đỡ sẽ tìm người lớn - Cảnh giác với chiêu trò tìm thú cưng!"
  },
  {
    id: 92,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Một người trên mạng yêu cầu em gửi ảnh riêng tư để đổi lấy thẻ quà tặng hoặc đồ chơi hiếm trong game. Em nên làm gì?",
    options: [
      "Không gửi, dừng tương tác ngay, chụp ảnh màn hình và báo cho bố mẹ.",
      "Gửi một tấm ảnh mờ mờ để lấy quà.",
      "Thương lượng đòi thêm quà rồi mới gửi."
    ],
    correctIndex: 0,
    explanation: "Không có phần thưởng ảo nào có thể so sánh với danh dự và sự an toàn của em. Đừng bao giờ rơi vào bẫy này.",
    ruleTip: "Ảnh riêng tư là vô giá - Không đánh đổi lấy vật phẩm ảo!"
  },
  {
    id: 93,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Một người cố tình chạm vào vùng riêng tư của em và đe dọa yêu cầu giữ bí mật. Em nên làm gì?",
    options: [
      "Nói KHÔNG thật to, lập tức rời khỏi nơi đó và kể ngay cho người lớn đáng tin cậy hoặc gọi 111.",
      "Im lặng vì sợ bị trả thù.",
      "Chờ xem lần sau người đó có làm tiếp không."
    ],
    correctIndex: 0,
    explanation: "Quy tắc Vàng 3 bước: 1. Nói KHÔNG! 2. CHẠY THẬT NHANH! 3. KỂ NGAY VỚI NGƯỜI LỚN! Em không bao giờ đơn độc.",
    ruleTip: "3 Bước bảo vệ: NÓI KHÔNG -> CHẠY NGAY -> KỂ VỚI NGƯỜI LỚN!"
  },
  {
    id: 94,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Số điện thoại của Tổng đài Quốc gia Bảo vệ Trẻ em tại Việt Nam là số nào?",
    options: [
      "111 (Hoàn toàn miễn cước gọi, trực 24/7 bảo vệ trẻ em mọi lúc).",
      "1900 1000.",
      "911."
    ],
    correctIndex: 0,
    explanation: "Rất xuất sắc! Số 111 là số điện thoại thần kỳ bảo vệ trẻ em Việt Nam. Bất cứ khi nào em bị bạo lực, xâm hại hay lo sợ, hãy gọi 111 để được hỗ trợ khẩn cấp.",
    ruleTip: "Ghi nhớ số 111: Tổng đài Quốc gia Bảo vệ Trẻ em Việt Nam (Miễn phí 24/7)!"
  },
  {
    id: 95,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Khi gặp tình huống bị kẻ xấu bám theo hoặc túm lấy ở nơi công cộng, câu hét nào hiệu quả nhất?",
    options: [
      "'CỨU CHÁU VỚI! CHÁU KHÔNG QUEN NGƯỜI NÀY! BẮT CÓC!'.",
      "'Buông con ra con không thích'.",
      "Chỉ khóc thút thít không nói gì."
    ],
    correctIndex: 0,
    explanation: "Câu hét rõ ràng 'CHÁU KHÔNG QUEN NGƯỜI NÀY' sẽ báo động cho tất cả người xung quanh biết đây là hành vi nguy hiểm cần can thiệp ngay.",
    ruleTip: "Hét to 'CHÁU KHÔNG QUEN NGƯỜI NÀY' để nhận sự trợ giúp ngay!"
  },
  {
    id: 96,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Quy tắc 5 ngón tay dạy em điều gì về ranh giới giao tiếp?",
    options: [
      "Phân biệt mức độ đụng chạm an toàn: Ngón cái (người thân ôm), Ngón trỏ (khoác tay), Ngón giữa (bắt tay), Ngón áp út (vẫy tay), Ngón út (người lạ - xua tay tránh xa).",
      "Dạy cách đếm từ 1 đến 5 khi chơi trốn tìm.",
      "Dạy cách chơi đàn piano."
    ],
    correctIndex: 0,
    explanation: "Quy tắc 5 ngón tay là tấm khiên ranh giới giúp em xác định rõ ai được chạm vào đâu và ai phải giữ khoảng cách.",
    ruleTip: "Quy tắc 5 ngón tay: Ngón út xa nhất - Người lạ xua tay tránh xa!"
  },
  {
    id: 97,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Nếu có ai đó đe dọa rằng: 'Mày mà kể với ai thì tao sẽ hại cả nhà mày', em nên hiểu điều đó như thế nào?",
    options: [
      "Đó là lời nói dối của kẻ xấu vì chúng sợ bị phát hiện. Hãy dũng cảm kể ngay với bố mẹ và công an để kẻ xấu bị bắt.",
      "Lời đe dọa đó chắc chắn là thật, nên phải giữ im lặng.",
      "Tự trốn đi một nơi thật xa."
    ],
    correctIndex: 0,
    explanation: "Kẻ xấu chỉ dùng lời đe dọa để che giấu sự sợ hãi của chính chúng. Khi em lên tiếng, pháp luật và người lớn sẽ tóm gọn kẻ xấu và bảo vệ gia đình em.",
    ruleTip: "Lời đe dọa là sự dối trá - Lên tiếng là sức mạnh vô địch!"
  },
  {
    id: 98,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Một nhóm bạn gửi ảnh chụp lén một bạn trong lớp và rủ em cùng vào bình luận chế giễu. Em nên hành động như thế nào?",
    options: [
      "Không tham gia, khuyên các bạn dừng lại và báo cho giáo viên chủ nhiệm để bảo vệ bạn.",
      "Vào hùa bình luận để không bị coi là người ngoài cuộc.",
      "Chuyển tiếp cho các lớp khác cùng xem."
    ],
    correctIndex: 0,
    explanation: "Rất dũng cảm! Một Hiệp sĩ thực thụ luôn đứng về phía lẽ phải và bảo vệ người yếu thế, không bao giờ tiếp tay cho hành vi xấu.",
    ruleTip: "Nói KHÔNG với bạo lực mạng - Đứng về phía lẽ phải!"
  },
  {
    id: 99,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Mật khẩu điện thoại, máy tính và tài khoản mạng của em nên chia sẻ cho ai?",
    options: [
      "Chỉ chia sẻ cho bố mẹ hoặc người giám hộ đáng tin cậy quản lý.",
      "Chia sẻ cho tất cả bạn bè thân thiết.",
      "Đăng mật khẩu lên trang cá nhân."
    ],
    correctIndex: 0,
    explanation: "Bố mẹ giúp em bảo vệ tài khoản khỏi kẻ gian. Ngoài bố mẹ ra, không một ai khác có quyền đòi mật khẩu của em.",
    ruleTip: "Bảo mật tài khoản: Chỉ bố mẹ là người giữ chìa khóa dự phòng!"
  },
  {
    id: 100,
    topicId: 10,
    topicName: "Safety Hero - Thử thách tổng hợp",
    levelId: 7,
    monsterName: "Bóng Đêm Nguy Hiểm",
    question: "Danh hiệu 'SAFETY HERO - HIỆP SĨ AN TOÀN' có ý nghĩa gì đối với em?",
    options: [
      "Em biết yêu quý, làm chủ và bảo vệ cơ thể mình, đồng thời luôn tôn trọng, lan tỏa kiến thức an toàn cho mọi người xung quanh.",
      "Chỉ là một trò chơi điện tử không có ý nghĩa gì.",
      "Để đi bắt nạt các bạn nhỏ tuổi hơn."
    ],
    correctIndex: 0,
    explanation: "CHÚC MỪNG EM! Em đã hoàn thành xuất sắc 100 câu hỏi và chính thức trở thành một SAFETY HERO thực thụ! Em mang trong mình kiến thức, sự tự tin và lòng dũng cảm để bảo vệ bản thân và bạn bè suốt đời!",
    ruleTip: "SAFETY HERO: Dũng cảm - Tự tin - Hiểu biết - Tôn trọng ranh giới!"
  }
];
