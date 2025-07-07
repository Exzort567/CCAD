'use client'

import Image from 'next/image';
import DropdownSection from '@/components/DropdownSection';
import { useSectionAnimation } from '@/hooks/useSectionAnimation';

export default function BachCouncilPage() {

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
        {/* Honorary Chairperson - Connected properly */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-3 w-80">
            <div className="bg-white border-2 border-gray-500 rounded-lg p-2 mb-1 text-center">
              <h2 className="text-xs font-bold text-gray-900">HON. ERICO ARISTOTLE C. AUMENTADO</h2>
            </div>
            <p className="text-xs text-gray-700 text-center">Honorary Chairperson</p>
          </div>

          {/* Connection Line from Honorary to Executive - No gap */}
          <div className="w-0.5 h-6 bg-gray-800"></div>

          {/* Executive Board - Connected properly */}
          <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-4 w-full max-w-3xl">
            <div className="bg-white border-2 border-gray-500 rounded-lg p-2 mb-4 text-center">
              <h3 className="text-sm font-bold text-gray-900">EXECUTIVE BOARD</h3>
            </div>
            
            {/* Top Row - Main Positions */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">ATTY. JISELLE RAE AUMENTADO VILLAMOR</h4>
                <p className="text-xs text-gray-700 mt-1">Co-Chairperson</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">ARGEO M. MELISMO</h4>
                <p className="text-xs text-gray-700 mt-1">Chairperson</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">ATHENA G. VITOR</h4>
                <p className="text-xs text-gray-700 mt-1">Secretary</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">VIDA MAY TIROL DE JUAN</h4>
                <p className="text-xs text-gray-700 mt-1">Treasurer</p>
              </div>
            </div>

            {/* Bottom Row - Auditor and Executive Director */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">AURELIO SALGADOS</h4>
                <p className="text-xs text-gray-700 mt-1">Auditor</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xs text-gray-900 leading-tight">EMERSON PINOS</h4>
                <p className="text-xs text-gray-700 mt-1">Executive Director</p>
              </div>
            </div>
          </div>

          {/* Connection from Executive to horizontal line - No gap */}
          <div className="w-0.5 h-6 bg-gray-800"></div>

          {/* Horizontal connecting line */}
          <div className="h-0.5 w-[61.2%] bg-gray-800"></div>

                                {/* Connected grid structure for sections */}
           <div className="relative w-full max-w-4xl">
             {/* Four vertical lines down to sections - properly positioned */}
              <div className="grid grid-cols-4 gap-4 mb-0">
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gray-800"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gray-800"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gray-800"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gray-800"></div>
                </div>
              </div>

              {/* Four Main Sections - properly connected */}
              <div className="grid grid-cols-4 gap-4">
                
                {/* Arts Section */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 text-center w-full">
                    <p className="text-xs text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs text-gray-900">SHERWIN SAPONG</h5>
                    <p className="text-xs text-gray-700">(ARTS)</p>
                  </div>
                  
                  {/* Connection line from Section Head to Committee */}
                  <div className="w-0.5 h-4 bg-gray-800"></div>
                  
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 w-full">
                    <p className="text-xs font-bold text-gray-900 mb-2">Committee Heads & Members:</p>
                    <div className="space-y-1 text-xs">
                      <div>
                        <h6 className="font-bold text-gray-900">ROSALIMA ABAPO</h6>
                        <p className="text-gray-700">VISUAL ARTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">NILA ITAC</h6>
                        <p className="text-gray-700">DANCE</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">LUCELL LARAWAN</h6>
                        <p className="text-gray-700">VISUAL ARTS/CRAFTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">RENE PONTE</h6>
                        <p className="text-gray-700">LITERARY ARTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">CHESTER IMPANG</h6>
                        <p className="text-gray-700">PHOTOGRAPHIC/VIDEOGRAPHIC ARTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">ANGELA CROWEL</h6>
                        <p className="text-gray-700">MEDIA ARTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">JERREY DAVID AGUILAR</h6>
                        <p className="text-gray-700">DRAMA & THEATRE</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heritage Section */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 text-center w-full">
                    <p className="text-xs text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs text-gray-900">FR. TED TORRALBA</h5>
                    <p className="text-xs text-gray-700">(HERITAGE)</p>
                  </div>
                  
                  {/* Connection line from Section Head to Committee */}
                  <div className="w-0.5 h-4 bg-gray-800"></div>
                  
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 w-full">
                    <p className="text-xs font-bold text-gray-900 mb-2">Committee Heads & Members:</p>
                    <div className="space-y-1 text-xs">
                      <div>
                        <h6 className="font-bold text-gray-900">ATHENA G. VITOR</h6>
                        <p className="text-gray-700">MUSEUM</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">NICANDRO M. PAGARAN</h6>
                        <p className="text-gray-700">LIBRARIES</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">ROSALINA SARABOSING</h6>
                        <p className="text-gray-700">LANGUAGE</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">MARIA VIDA C. APARICIO</h6>
                        <p className="text-gray-700">ARCHIVES</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">ARCT. NIÑO GUIDABEN</h6>
                        <p className="text-gray-700">PHOTOGRAPHIC/VIDEOGRAPHIC ARTS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">MARIANITO JOSE M. LUSPO</h6>
                        <p className="text-gray-700">HISTORICAL STUDIES</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Culture & Development Section */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 text-center w-full">
                    <p className="text-xs text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs text-gray-900">EMILIA M. ROSALINDA</h5>
                    <p className="text-xs text-gray-700">(CULTURE & DEVELOPMENT)</p>
                  </div>
                  
                  {/* Connection line from Section Head to Committee */}
                  <div className="w-0.5 h-4 bg-gray-800"></div>
                  
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 w-full">
                    <p className="text-xs font-bold text-gray-900 mb-2">Committee Heads & Members:</p>
                    <div className="space-y-1 text-xs">
                      <div>
                        <h6 className="font-bold text-gray-900">VIDA MAY T. DE JUAN</h6>
                        <p className="text-gray-700">CULTURE & EDUCATION</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">EMILIA M. ROSALINDA</h6>
                        <p className="text-gray-700">ECO-CULTURAL TOURISM</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">AURELIO SALGADOS, Jr.</h6>
                        <p className="text-gray-700">CULTURAL FOUNDATIONS & HODS</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Culture & Governance Section */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 text-center w-full">
                    <p className="text-xs text-gray-700 mb-1">Section Head</p>
                    <h5 className="font-bold text-xs text-gray-900">BONIFACIO QUIROS</h5>
                    <p className="text-xs text-gray-700">(CULTURE & GOVERNANCE)</p>
                  </div>
                  
                  {/* Connection line from Section Head to Committee */}
                  <div className="w-0.5 h-4 bg-gray-800"></div>
                  
                  <div className="bg-gray-100 border-2 border-gray-400 rounded-xl p-2 w-full">
                    <p className="text-xs font-bold text-gray-900 mb-2">Committee Heads & Members:</p>
                    <div className="space-y-1 text-xs">
                      <div>
                        <h6 className="font-bold text-gray-900">FIEL ANGELI E. ARAOARAO GABIN</h6>
                        <p className="text-gray-700">LOCAL CULTURAL COUNCILS</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">MARY ANNIE JABINES</h6>
                        <p className="text-gray-700">LGU</p>
                      </div>
                      <div>
                        <h6 className="font-bold text-gray-900">MARIA SOLEDAD BALISTOY</h6>
                        <p className="text-gray-700">GOVERNMENT</p>
                      </div>
                    </div>
                  </div>
                </div>

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

        {/* Spacer at the bottom of the page */}
        <div className="my-12" />

      </div>
    </div>
  );
}