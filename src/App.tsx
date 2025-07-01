import React, { useState } from 'react';
import { ChevronDown, X, Heart, Thermometer, Zap, Shield, Star, Users, Settings, Lock, Phone, MessageSquare, Calendar, User, Droplets, Sparkles, Activity } from 'lucide-react';

function App() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAsModalOpen, setIsAsModalOpen] = useState(false);
  const [isAsInquiryModalOpen, setIsAsInquiryModalOpen] = useState(false);
  const [asPassword, setAsPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // A/S 문의 게시판 데이터 (실제로는 서버에서 관리)
  const [asInquiries, setAsInquiries] = useState([
    {
      id: 1,
      title: 'A/S 받고싶습니다',
      phone: '010-****-1234',
      date: '2024-01-15',
      status: '접수완료'
    },
    {
      id: 2,
      title: 'A/S 받고싶습니다',
      phone: '010-****-5678',
      date: '2024-01-14',
      status: '처리중'
    },
    {
      id: 3,
      title: 'A/S 받고싶습니다',
      phone: '010-****-9012',
      date: '2024-01-13',
      status: '완료'
    }
  ]);

  // 구매자 휴대폰번호 목록 (실제 운영시에는 서버에서 관리)
  const validPasswords = [
    '01012345678',
    '01087654321',
    '01055556666',
    '01099998888',
    // 여기에 구매자들의 휴대폰번호를 추가하시면 됩니다
  ];

  const openPurchaseModal = () => setIsPurchaseModalOpen(true);
  const closePurchaseModal = () => setIsPurchaseModalOpen(false);
  
  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  
  const openAsModal = () => setIsAsModalOpen(true);
  const closeAsModal = () => {
    setIsAsModalOpen(false);
    setAsPassword('');
    setIsPasswordCorrect(false);
  };

  const openAsInquiryModal = () => setIsAsInquiryModalOpen(true);
  const closeAsInquiryModal = () => {
    setIsAsInquiryModalOpen(false);
    setPhoneNumber('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setAsPassword(password);
    // 입력된 비밀번호가 유효한 휴대폰번호 목록에 있는지 확인
    setIsPasswordCorrect(validPasswords.includes(password));
  };

  const handleAsInquiry = () => {
    if (isPasswordCorrect) {
      // 카카오톡 오픈채팅방으로 이동
      window.open('https://open.kakao.com/o/sirEIqCh', '_blank');
      closeAsModal();
    }
  };

const handleAsInquirySubmit = async () => {
  if (!phoneNumber.trim()) {
    alert('연락처를 입력해주세요.');
    return;
  }

  const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
  if (!phoneRegex.test(phoneNumber.replace(/-/g, ''))) {
    alert('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
    return;
  }

  try {
    // 🔥 Formspree로 이메일 전송
    const response = await fetch('https://formspree.io/f/myzjobbw
', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        message: 'ALLYGO365 A/S 문의 요청',
        timestamp: new Date().toLocaleString('ko-KR')
      })
    });

    if (response.ok) {
      // 게시판에 표시
      const newInquiry = {
        id: Date.now(),
        title: 'A/S 받고싶습니다',
        phone: phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3'),
        date: new Date().toISOString().split('T')[0],
        status: '접수완료'
      };

      setAsInquiries(prev => [newInquiry, ...prev.slice(0, 4)]);
      
      alert('A/S 문의가 접수되었습니다. 비밀번호를 문자로 발송해드리겠습니다.');
      closeAsInquiryModal();
    } else {
      throw new Error('전송 실패');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

    const result = await response.json();
    
    if (result.success) {
      // 로컬 상태 업데이트
      const newInquiry = {
        id: Date.now(),
        title: 'A/S 받고싶습니다',
        phone: phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3'),
        date: new Date().toISOString().split('T')[0],
        status: '접수완료'
      };

      setAsInquiries(prev => [newInquiry, ...prev.slice(0, 4)]);
      
      alert('A/S 문의가 접수되었습니다. 비밀번호를 문자로 발송해드리겠습니다.');
      closeAsInquiryModal();
    } else {
      throw new Error('서버 응답 오류');
    }
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    alert('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
};



  const handlePhoneCall = () => {
    window.location.href = 'tel:07080641665';
  };

  // 이미지 우클릭 방지 함수
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // 드래그 방지 함수
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                ALLYGO<span className="text-red-500">365</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-red-500 transition-colors">홈</a>
              <a href="#product" className="text-gray-700 hover:text-red-500 transition-colors">제품소개</a>
              <a href="#benefits" className="text-gray-700 hover:text-red-500 transition-colors">효과</a>
              <a href="#technology" className="text-gray-700 hover:text-red-500 transition-colors">기술</a>
              <a href="#gallery" className="text-gray-700 hover:text-red-500 transition-colors">사용후기</a>
              <a href="#as-board" className="text-gray-700 hover:text-red-500 transition-colors">A/S문의</a>
            </nav>
            <button 
              onClick={openPurchaseModal}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors font-medium"
            >
              제품 구매하기
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                건강관리는 <span className="text-red-500">올리고</span>부터!
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                현대인이 원인을 알 수 없는 각종 면역질환에 시달리는 이유 '체온'<br/>
                하지만 50년 전에 사람의 체온 평균 36.8℃,<br/>
                현재는 35℃대!!<br/>
                저체온증을 걱고 있는 현대인!!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={openPurchaseModal}
                  className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-all transform hover:scale-105 font-medium text-lg"
                >
                  제품 구매하기
                </button>
                <button 
                  onClick={openPaymentModal}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-red-500 hover:text-red-500 transition-colors font-medium text-lg"
                >
                  결제 요청하기
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/2.jpg" 
                alt="올리고365 제품 사용 모습" 
                className="rounded-2xl shadow-2xl w-full"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Thermometer className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">체온 상승</p>
                    <p className="text-sm text-gray-600">36.5℃ 유지</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Introduction */}
      <section id="product" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              올리고365는?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              470,000년의 고주파로 이용하여 실무영을 올리는 고주파 자극 의료기기입니다. 
              발과 종아리 30분만에 온몸을 전달하여 가정에서 간편하게 사용할 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/1.jpg" 
                alt="올리고365 제품 상세" 
                className="rounded-2xl shadow-xl w-full"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Zap className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">고주파 기술</h3>
                  <p className="text-gray-600">470,000Hz의 고주파로 깊은 근육까지 자극하여 혈액순환을 촉진합니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">혈액순환 개선</h3>
                  <p className="text-gray-600">발과 종아리 자극을 통해 전신 혈액순환을 개선하고 체온을 상승시킵니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">안전한 사용</h3>
                  <p className="text-gray-600">가정에서 안전하게 사용할 수 있도록 설계된 의료기기입니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Droplets className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">림프순환 개선</h3>
                  <p className="text-gray-600">림프순환 향상으로 세포의 신진대사 활성 및 면역체계 개선에 기여합니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">피부노화 저하 및 세포활성화</h3>
                  <p className="text-gray-600">체내 지방 융해, 콜라겐 생성 유도, 살균 기능을 통해 피부 건강을 개선합니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
                  <Activity className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">뭉쳐진 근육 조직 이완, 통증 완화</h3>
                  <p className="text-gray-600">고주파 자극을 통해 근육 긴장을 완화하고 통증을 줄여줍니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              체온상승이 신체에 미치는 영향
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-red-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">▷ 낮은 체온은 왜 건강에 나쁠까?</h3>
                <div className="space-y-4 text-gray-700">
                  <p>체온이 1℃ 올라가면 면역력이 5~6배 높아지고, 1℃ 내려가면 30% 낮아진다!</p>
                  <p className="text-sm">(출처: 니가타대학교 아베 도오루 박사)</p>
                  <p>정상체온에서 1℃만 떨어져도 우리 몸의 면역력은 30% 정도 감소하고, 기초대사율은 12%, 신진대사율은 50% 정도 감소한다고 알려져 있습니다.</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/heal.png" 
                alt="체온과 건강의 관계" 
                className="rounded-2xl shadow-xl w-full"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-2xl mb-16">
            <h3 className="text-2xl font-bold mb-6">▷ 우리몸에 꼭 필요한 체온은 36.5℃입니다</h3>
            <p className="text-gray-300 leading-relaxed">
              우리 몸은 정상체온인 36.5℃, 심부 체온 37℃ 이상일 때 체내 화학반응이 활발하게 일어나고 신진대사도 순조롭게 진행됩니다. 
              정상적으로 피가 만들어져 전신을 돌며 몸의 힘이 커집니다. 면역과 체온 그리고 혈액의 이러한 상관관계를 알고 있다면 
              바로 몸을 따뜻하게 하는 것입니다.
            </p>
          </div>

          {/* 심부체온 상승 효과 제목 추가 */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              심부체온이 상승했을때 기대할수있는 효과
            </h3>
          </div>

          <div className="grid md:grid-cols-5 gap-6 text-center">
            {[
              { icon: Heart, title: '암 예방', desc: '면역력 강화' },
              { icon: Zap, title: '신진대사 원활', desc: '기초대사율 증가' },
              { icon: Shield, title: '치매 예방', desc: '뇌혈관 개선' },
              { icon: Users, title: '노화 예방', desc: '세포 활성화' },
              { icon: Star, title: '비만 개선', desc: '지방 연소' }
            ].map((benefit, index) => (
              <div key={index} className="bg-red-500 text-white p-6 rounded-xl hover:bg-red-600 transition-colors">
                <benefit.icon className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm opacity-90">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              저체온을 해결할 역시 <span className="text-red-500">심부체온</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              인체 내외 100,000 Hz 이상의 고주파 진동이 전해지면 전류의 방향이 바뀔 때 마다 
              조직을 구성하는 분자간 ... 진동 마찰열에 의해 체내 컨덕션 전달되고 최전도등, 
              터널링, 중폭 운동에 의해 생체연수 발생시킵니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                심부열(심부체온)을 올려주는 <span className="text-red-500">고주파</span>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                저주파나 중주파는 따갑거나 찌릿하지만 고주파는 물리적으로 자극을 주지 않고, 
                심부열(심부체온)으로 개어하기 때문에 인체에 해를 주지 않습니다. 저주파는 피하지방까지, 
                고주파는 뼈까지 전기자극이 도달 할 수 있어 해 인체에 가해지면서 분자들이 새롭게 움직이고, 
                물에서 화전하여 충돌에서 심부체온을 올려줍니다.
              </p>
            </div>
            <div>
              <img 
                src="/high.png" 
                alt="고주파 기술 설명" 
                className="rounded-2xl shadow-xl w-full"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>

          {/* 왜 고주파인가? 섹션 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              왜 <span className="text-red-500">고주파</span>인가?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">고주파 전류의 정의</h4>
                <p className="text-gray-700 leading-relaxed">
                  <strong>100,000Hz 이상의 교류 전류</strong>를 고주파 전류(high frequency current HFC)라고 합니다. 
                  고주파수의 전기 에너지가 가해지면, 전류의 방향이 바뀔 때마다 구성하는 분자들이 진동하면서 
                  서로 마찰하게 되어 <strong>회전운동, 유동운동, 충돌운동</strong>에 의해 생체 열을 발생시킵니다.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">안전한 고주파</h4>
                <p className="text-gray-700 leading-relaxed">
                  고주파 전류는 인체조직을 통과할 때, <strong>진동 폭이 매우 작기 때문에 이온운동이 거의 일어나지 않으며</strong>, 
                  전기 화학적인 반응 또는 전기 분해현상이 없습니다. 생체 열에너지로 변환된 고주파에너지는 
                  조직의 온도를 상승시켜 <strong>세포의 기능을 증진시키고, 혈류량을 증가</strong>시키는 등의 역할을 합니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 p-8 rounded-xl mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-center">고주파 치료 특징</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">치료 원리</h5>
                  <p className="text-gray-700 leading-relaxed">
                    고주파는 저주파나 중주파와 달리 <strong>찌릿한 물리적 자극으로 치료하는 것이 아니라</strong> 
                    심부열이라 불리는 피부 심층에 발생하는 <strong>열작용의 생화학적 작용</strong>으로 치료합니다.
                  </p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">적용 범위</h5>
                  <p className="text-gray-700 leading-relaxed">
                    저주파나 중주파에 비해 치료범위가 넓고 광범위하여 치료뿐만 아니라 
                    <strong>근육통, 비만, 셀룰라이트, 피부 치료</strong> 등에 쓰입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 고주파 심부열의 효과 */}
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-8">고주파 심부열의 효과</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  { title: '림프순환 촉진', icon: '🔄' },
                  { title: '세포기능 정상화', icon: '🧬' },
                  { title: '통증완화', icon: '💊' },
                  { title: '혈액순환 촉진', icon: '❤️' },
                  { title: '콜라겐층 자극', icon: '✨' },
                  { title: '지방분해', icon: '🔥' },
                  { title: '호르몬 밸런스조절', icon: '⚖️' },
                  { title: '수축 및 재생촉진', icon: '🔄' }
                ].map((effect, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-2xl mb-2">{effect.icon}</div>
                    <p className="text-sm font-medium text-gray-900 leading-tight">{effect.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              실제 사용자들의 후기
            </h2>
            <p className="text-xl text-gray-600">
              올리고365를 사용하고 계신 분들의 생생한 사용 모습을 확인해보세요
            </p>
          </div>

          {/* User Review Images Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: '/1.png', alt: '사용자 후기 1', title: '실제 사용자 A' },
              { src: '/2.png', alt: '사용자 후기 2', title: '실제 사용자 B' },
              { src: '/3.png', alt: '사용자 후기 3', title: '실제 사용자 C' },
              { src: '/4.png', alt: '사용자 후기 4', title: '실제 사용자 D' },
              { src: '/5.png', alt: '사용자 후기 5', title: '실제 사용자 E' },
              { src: '/6.png', alt: '사용자 후기 6', title: '실제 사용자 F' },
              { src: '/7.png', alt: '사용자 후기 7', title: '실제 사용자 G' },
              { src: '/8.png', alt: '사용자 후기 8', title: '실제 사용자 H' }
            ].map((image, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    style={{ 
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                  />
                  {/* 이미지 보호를 위한 투명 오버레이 */}
                  <div 
                    className="absolute inset-0 bg-transparent"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    style={{ 
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      pointerEvents: 'auto'
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-900">{image.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">올리고365 사용 모습</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              올리고365와 함께 건강한 체온 관리를 경험해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* A/S Inquiry Board Section */}
      <section id="as-board" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              비회원 A/S 문의 게시판
            </h2>
            <p className="text-xl text-gray-600">
              제품 구매 후 A/S가 필요하신 분들은 아래에서 문의해주세요
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* 글쓰기 버튼 */}
            <div className="flex justify-end mb-8">
              <button 
                onClick={openAsInquiryModal}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>A/S 문의하기</span>
              </button>
            </div>

            {/* 게시판 목록 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 border-b">
                <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700">
                  <div className="col-span-1">번호</div>
                  <div className="col-span-4">제목</div>
                  <div className="col-span-3">연락처</div>
                  <div className="col-span-2">등록일</div>
                  <div className="col-span-2">상태</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {asInquiries.slice(0, 5).map((inquiry, index) => (
                  <div key={inquiry.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">{asInquiries.length - index}</div>
                      <div className="col-span-4">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-gray-900">{inquiry.title}</span>
                        </div>
                      </div>
                      <div className="col-span-3 text-gray-600 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{inquiry.phone}</span>
                      </div>
                      <div className="col-span-2 text-gray-600 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{inquiry.date}</span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          inquiry.status === '완료' 
                            ? 'bg-green-100 text-green-800' 
                            : inquiry.status === '처리중'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {asInquiries.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">
                  등록된 문의가 없습니다.
                </div>
              )}
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p>최근 5개의 문의만 표시됩니다. 문의 접수 후 비밀번호를 문자로 발송해드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* A/S Section */}
      <section id="as" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A/S 안내
            </h2>
            <p className="text-xl text-gray-600">
              1년 무상 A/S, 기존 타 대리점 구매자들께서는 구매 대리점을 통해서 문의해주세요
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Settings className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">1년 무상 A/S 안내</h3>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                저희 제품을 선택해 주셔서 진심으로 감사드립니다.<br/>
                고객님의 만족을 최우선으로 생각하며, 아래와 같이 <strong>1년 무상 A/S(보증 서비스)</strong>를 제공하고 있습니다.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    📅 보증 기간
                  </h4>
                  <p className="text-gray-600">구입일로부터 1년 이내</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    ✅ 무상 A/S 적용 조건
                  </h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 제품 자체의 제조상 결함 또는 정상적인 사용 중 발생한 고장에 한해 무상 수리가 가능합니다.</li>
                    <li>• 영수증 또는 구매내역 증빙 자료가 필요합니다.</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  ❌ 무상 A/S 제외 항목
                </h4>
                <p className="text-gray-600 mb-3">다음의 경우에는 무상 A/S 대상에서 제외됩니다:</p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• 고객의 부주의로 인한 파손 (낙하, 충격, 침수 등)</li>
                  <li>• 임의 분해 또는 비공식 수리로 인한 고장</li>
                  <li>• 소비자 과실로 인한 손상 (예: 과도한 압력, 오용 등)</li>
                  <li>• 소모품(램프 버튼 등)의 교체</li>
                </ul>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  🛠 A/S 신청 방법
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  A/S는 제품구매시 안내된 연락처로 문의해주시고, 정품으로 구매하신분들은 구매 대리점에서 AS문의를 해주시고 
                  제품 구매시 안내된 AS 전화번호로 연락하시면 됩니다.
                </p>
              </div>

              <div className="text-center">
                <button 
                  onClick={openAsModal}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 font-medium text-lg"
                >
                  A/S 문의하기
                </button>
              </div>
            </div>

            {/* Manufacturing Images */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="/올리고공장2.png" 
                  alt="올리고365 제조 과정" 
                  className="w-full h-48 object-cover"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">품질 검사</h4>
                  <p className="text-sm text-gray-600">엄격한 품질 관리 시스템</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="/올리고공장4.png" 
                  alt="올리고365 제조 시설" 
                  className="w-full h-48 object-cover"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">제조 시설</h4>
                  <p className="text-sm text-gray-600">최첨단 생산 라인</p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="/올리고공장8.png" 
                  alt="올리고365 기술 검증" 
                  className="w-full h-48 object-cover"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900">기술 검증</h4>
                  <p className="text-sm text-gray-600">정밀한 기술 테스트</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 건강한 체온 관리를 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            올리고365와 함께 36.5℃의 건강한 체온을 유지하고 면역력을 높여보세요.
          </p>
          <button 
            onClick={openPurchaseModal}
            className="bg-white text-red-500 px-12 py-4 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-xl"
          >
            제품 구매하기
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                ALLYGO<span className="text-red-500">365</span>
              </div>
              <p className="text-gray-400">
                건강한 체온 관리로<br/>
                더 나은 삶을 만들어갑니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">제품</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">올리고365</a></li>
                <li><a href="#" className="hover:text-white transition-colors">사용법</a></li>
                <li><a href="#" className="hover:text-white transition-colors">효과</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">고객지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">사용자 가이드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">A/S 신청</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">회사정보</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">회사소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ALLYGO365. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Purchase Modal (제품 구매 문의) */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={closePurchaseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                제품 구매 문의
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                제품구매 문의만 가능합니다
              </p>
              
              <button 
                className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-colors"
                onClick={handlePhoneCall}
              >
                전화문의하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal (결제 요청하기) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={closePaymentModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                제품 구매 안내
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                반드시 상담을 통해 제공받은 비번을 눌러서 채팅으로 요청해주세요
              </p>
              
              <button 
                className="w-full bg-yellow-400 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors"
                onClick={() => {
                  alert('결제창 요청이 전송되었습니다. 상담원이 곧 연락드리겠습니다.');
                  closePaymentModal();
                }}
              >
                결제창 요청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A/S Modal (기존 회원용) */}
      {isAsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={closeAsModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                A/S 문의 인증
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                비밀번호를 입력해주세요
              </p>
              
              <div className="mb-6">
                <input
                  type="password"
                  value={asPassword}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호 입력"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button 
                className={`w-full py-4 rounded-full font-bold text-lg transition-colors ${
                  isPasswordCorrect 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleAsInquiry}
                disabled={!isPasswordCorrect}
              >
                A/S 문의하기
              </button>
              
              {asPassword && !isPasswordCorrect && (
                <p className="text-red-500 text-sm mt-3">
                  올바르지 않은 비밀번호입니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* A/S Inquiry Modal (비회원용) */}
      {isAsInquiryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={closeAsInquiryModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                비회원 A/S 문의
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                비회원은 AS 문의 비번은 문자로 남겨드립니다<br/>
                연락처를 남겨주시고 문의하기 버튼을 눌러주세요
              </p>
              
              <div className="mb-6">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  요청자 연락처
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <button 
                className="w-full bg-orange-600 text-white py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-colors"
                onClick={handleAsInquirySubmit}
              >
                문의하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for additional image protection */}
      <style jsx>{`
        img {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
        
        /* Disable right-click context menu on images */
        img::selection {
          background: transparent;
        }
        
        img::-moz-selection {
          background: transparent;
        }
        
        /* Disable text selection on image containers */
        .image-container {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
}

export default App;