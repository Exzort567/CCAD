'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DropdownSection from '@/components/DropdownSection';
import { useSectionAnimation } from '@/hooks/useSectionAnimation';
import FlippingBook from '@/components/FlippingBook';

interface CouncilMember {
  _id: string;
  name: string;
  position: string;
  category: string;
  committee?: string;
  order?: number;
}

export default function BachCouncilPage() {
  const [council, setCouncil] = useState<CouncilMember[]>([]);

  useEffect(() => {
    const fetchCouncil = async () => {
      const res = await fetch('/api/council');
      const data = await res.json();
      setCouncil(data);
    };
    fetchCouncil();
  }, []);

  const objectives = [
    'The preservation and revitalization of the Boholano Cultural Heritage, raising Boholano/Filipino pride and self-identity',
    'The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people\'s values, ideas, struggles, and aspirations',
    'Sustainable community-based cultural productivity integrated into eco-tourism for the economic development of Bohol',
    'To promote the growth of the creation of new artistic works',
    'Cultural promotion and networking'
  ];

  const duties = [
    'To initiate the formulation and enactment of appropriate legislation for the preservation and protection of Boholano cultural heritage',
    'The cultural empowerment of Boholano individuals, groups, communities, and institutions working for the highest standards of artistic expression, faithfully reflecting the Boholano people\'s values, ideas, struggles, and aspirations',
    'To help revitalize Boholano cultural traditions',
    'To promote the growth of the creation of new artistic works',
    'To foster cultural empowerment of communities, groups, and institutions',
    'To foster awareness and appreciation of Boholano and Filipino Cultural Heritage'
  ];

  const sectionRef = useSectionAnimation();

  const renderMembersByCategory = (category: string) => {
    return council
      .filter(member => member.category === category)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(member => (
        <div key={member._id} className="text-center">
          <h4 className="font-bold text-xs text-gray-900 leading-tight">{member.name}</h4>
          <p className="text-xs text-gray-700 mt-1">{member.position}</p>
        </div>
      ));
  };

  const renderExecutiveBoard = () => {
    const executiveBoard = council
        .filter(member => member.category === 'Executive Board')
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const topRow = executiveBoard.slice(0, 4);
    const bottomRow = executiveBoard.slice(4);

    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {topRow.map(member => (
                    <div key={member._id} className="text-center">
                        <h4 className="font-bold text-xs text-gray-900 leading-tight">{member.name}</h4>
                        <p className="text-xs text-gray-700 mt-1">{member.position}</p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                {bottomRow.map(member => (
                    <div key={member._id} className="text-center">
                        <h4 className="font-bold text-xs text-gray-900 leading-tight">{member.name}</h4>
                        <p className="text-xs text-gray-700 mt-1">{member.position}</p>
                    </div>
                ))}
            </div>
        </>
    );
  };

  const renderSectionHeads = () => {
    const sectionHeads = council.filter(m => m.category === 'Section Head');
    const committees = council.filter(m => m.category === 'Committee Heads & Members');

    return sectionHeads
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(head => {
        const sectionName = head.position.match(/\(([^)]+)\)/)?.[1] || '';
        const committeeMembers = committees
            .filter(cm => cm.committee === sectionName)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        return (
            <div key={head._id} className="flex flex-col items-center">
                <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 text-center w-full">
                    <p className="text-xs text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs text-gray-900">{head.name}</h5>
                    <p className="text-xs text-gray-700">{head.position}</p>
                </div>

                <div className="w-0.5 h-4 bg-gray-800"></div>

                <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 w-full">
                    <p className="text-xs font-bold text-gray-900 mb-2">Committee Heads & Members:</p>
                    <div className="space-y-1 text-xs">
                        {committeeMembers.map(cm => (
                            <div key={cm._id}>
                                <h6 className="font-bold text-gray-900">{cm.name}</h6>
                                <p className="text-gray-700">{cm.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    });
  };

  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Artistic BACH Logo and Title */}
        <div className="mt-6 max-w-xs mx-auto">
            <Image
              src="/images/bach.png"
              alt="BACH Logo"
              width={400}
              height={200}
            />
        </div>

        {/* Organizational Structure Title */}
        <div className="flex justify-center items-center my-4">
          <Image
            src="/images/structure.png"
            alt="Structure logo"
            width={25}
            height={25}
          />
          <h1 className="text-center text-1xl font-semibold mx-4">ORGANIZATIONAL STRUCTURE</h1>
          <Image
            src="/images/structure.png"
            alt="Structure logo"
            width={25}
            height={25}
          />
        </div>

        {/* Honorary Chairperson */}
        <div className="flex flex-col items-center">
          {renderMembersByCategory('Honorary Chairperson').map((member, index) => (
            <div key={index} className="bg-gray-100 border-2 border-gray-400 rounded-xl p-3 w-80">
                <div className="bg-white border-2 border-gray-500 rounded-lg p-2 mb-1 text-center">
                    {member}
                </div>
            </div>
          ))}

          <div className="w-0.5 h-6 bg-gray-800"></div>

          {/* Executive Board */}
          <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-4 w-full max-w-3xl">
            <div className="mb-4 text-center">
              <h3 className="text-md font-bold text-gray-900 font-inknut-antiqua">EXECUTIVE BOARD</h3>
            </div>
            {renderExecutiveBoard()}
          </div>
          
          <div className="w-0.5 h-6 bg-gray-800"></div>

          <div className="h-0.5 w-[61.2%] bg-gray-800"></div>

           <div className="relative w-full max-w-4xl">
              <div className="grid grid-cols-4 gap-4 mb-0">
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-gray-800"></div></div>
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-gray-800"></div></div>
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-gray-800"></div></div>
                <div className="flex justify-center"><div className="w-0.5 h-6 bg-gray-800"></div></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {renderSectionHeads()}
              </div>
            </div>
        </div>

        {/* Spacer */}
        <div className="my-12" />

        {/* Image and BACH Logo */}
        <div className="flex flex-col items-center justify-center text-center px-4">
         
        </div>
        
        {/* Spacer */}
        <div className="my-12" />
        
        <section ref={sectionRef} className="flex justify-center bg-white py-12 w-full animated-section slide-in-left">
          <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-10">
          
              {/* Objectives with Dropdown */}
              <div className="flex-1 flex flex-col items-center md:items-start w-full max-w-md mx-auto">
                <DropdownSection title="Objectives" items={objectives} />
              </div>

              {/* Duties and Functions with Dropdown */}
              <div className="flex-1 flex flex-col items-center md:items-start w-full max-w-md mx-auto">
                <DropdownSection title="Duties and Functions" items={duties} />
              </div>
            </div>
          </div>
        </section>

        <FlippingBook />

        {/* Spacer at the bottom of the page */}
        <div className="my-12" />

      </div>
    </div>
  );
}