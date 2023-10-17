import React from 'react';
import './Landing.css';  
import { useNavigate } from 'react-router-dom';

function Landing() {

    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/login'); 
      };

    return (
        <div className="landing">
            <div className="landing-page">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="navigation-bar">
                            <div className="frame">
                                <div className="logo-with-company">
                                    <div className="text-wrapper">Huup AI</div>
                                </div>
                                <button className="button">
                                    <div className="signup-button">Sign up</div>
                                    <div className="start-button" onClick={handleStartClick}>Get Start</div>
                                </ button>  
                                </div>
                        </div>
                        
                        {/* <div className="start-button" onClick={handleStartClick}>Get Start</div> */}
                        
                        <p className="enhance-LLM">
                            ENHANCE LLM <br />
                            RELIABILITY AND AFFORDABILITY
                        </p>
                        {/* <img className="subtract" alt="Subtract" src="subtract.svg" />
                        <img className="img" alt="Subtract" src="image.svg" /> */}

                        <div className="frame-2">
                            <p className="ai-model">
                                <span className="span">ai m</span>
                                <span className="span">odel</span>
                            </p>
                            <div className="group">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-2">340,000+</div>
                                    <div className="text-wrapper-3">340,000+</div>
                                </div>
                            </div>
                        </div>
                        <div className="frame-3">
                            <p className="GPU-cloud">
                                <span className="span">G</span>
                                <span className="span">PU Cloud</span>
                            </p>
                            <div className="overlap-group-wrapper">
                                <div className="overlap-group-3">
                                    <p className="element-hr">
                                        <span className="text-wrapper-4">$0.99/H</span>
                                        <span className="text-wrapper-4">r</span>
                                    </p>
                                    <p className="p">
                                        <span className="text-wrapper-5">$0.99/H</span>
                                        <span className="text-wrapper-5">r</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="partnership-frame">
                            <div className="partnership-overlap">
                                <div className="partnership-text">Our partnership</div>
                            </div>
                            <img className="mask-group" alt="Mask group" src="https://s3-alpha-sig.figma.com/img/4db3/54ab/b2db6d50dbb734e0b40444cf4d41f2cb?Expires=1698624000&Signature=LYs9IsUQ90A~JBgoNE1gPhyM6JCId~ndsg1d90LVi81AN-h~SDk-FFsyIKKwpwZdlUS7Me9buek0RjQDCB6JfuGmrRzM0INUAYk~rRoYgwDQNfOBz2oRDkCSDBpiYTaPVrfdIbMveuD4F1CloJWr16WeJhC1ymVPovyRjqTH73MyjQoHnWjwAs2BETOJswIGvdKblx8U58ASuMhVy1a1uWLyeCmdMbyafeLPyZHXxFr1XHM6aqKrvcpA9yZMuRnnZxkZccHYDE7CcpbOwVuvso820T6IT8v2wZmlza3xW7A5gcB7qr75w~T7xjj59uqZYQatfoVOquipl~AM4poXbQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                            <img className="element" alt="Element" src="https://s3-alpha-sig.figma.com/img/401b/bdb9/ac435736f85456293a9976161e808092?Expires=1698624000&Signature=L~xfv4n~valL5gD4QGjYfGQEoFFHBXLrNU6JCJmuB9YlTnsO39ZhRMg-Ne1c2XIagiPjM8igjJiKaP8WsQh9lmbyMU4P5lOp9Z6BekNjeo6InLcUgDYCHRwQHb~vVpymyPVfgXCJXMg29OldtDHd4MutaJiQurnQteE7xb5C6oCAcGrBpT-z5Dg4Qb3mQtKeLwUWP81~XoN6GiVoSzSyZl7~lOavNGSLxZzNJ2a~ciTaHjjLwdXGh3AszVTny1Nb8WNa-Cl~9pzU-u4cADOtQouyErf5xvHU~3Cna9rDfxWBw4LRwvYDeLDc0jQVgO5pLpp1iGjm-7PYW0QbxNKsJQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                            <img className="element-2" alt="Element" src="https://s3-alpha-sig.figma.com/img/f9cf/b393/c563945d468e5c507182177c964b9bd1?Expires=1698624000&Signature=kRs-6VOjaZ7h2yk0Atp9vpoEJOo4C77qcXgz0IOa02eHRgSz4OwX2H~KG4epYALHbnHtJ5WUXyE3xl5wj~~5lHEz6Eq8CtSZxJJUzuj55u2r5IlAVZ6fnMVG67glq9bJO~TFc5zNalKdpz~vqMabdCz0~4kS~Nhmv04awTzxA7J06lrrOZiN3YxogJDbKSLwed7bZEdmcGLljczz~UwdYLnYUofqO1Viy2f-AIBWsv9IU4O92rrLERC1psjlXSGVSiF-jBzFK~pzWUv34u8AGgcVwisOwZjnSFrkabSrcuQT~wSxLUbcO3O1UNn3s1mmgOP1tSHdVldwOQWUqkwISA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                            <img className="element-3" alt="Element" src="4-1.png" />
                            <img className="element-4" alt="Element" src="5-1.png" />
                            <img className="XMLID" alt="Xmlid" src="XMLID-1.png" />
                            <img className="XMLID-2" alt="Xmlid" src="https://s3-alpha-sig.figma.com/img/8591/8562/4863a611ac36c84426a6a0d0a9868910?Expires=1698624000&Signature=JCK6KNL63JoN2GMEHfnZyTjBet5BtTZETh3FdO4J2CDkB2pk1NJ-xQ6o9GsLkWoBdtJtMjJ6YM9gSC7thKEzsZYHUzu1Gxs-x5-L~nPEaWQQ9q08RlZv~91XRghh-OMcD1Dqe~iLoeju~Q1qVGCAUZUlhGKoFJuzPrBBrtZQPwuqnglYCP2RoQN~1vAVpX2nwrcciMbVu1JBofu2oG8vqJRT3oNBTvgqj423jxXMnPPrSpYRsJOuM831crAXuU2rGB~iB8U3GcFlVT4WlADka-NI9Vk86QS4aQSkPee7Ro6z1TSvPyt0vbz4zbo06UHm9-N1Jnox7jrvUS09yyaqIA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                            <img className="image" alt="Image" src="https://s3-alpha-sig.figma.com/img/f934/d126/5cb94f62b776577de5ed78efb71dcbbb?Expires=1698624000&Signature=Uw74rH8nFcKuhSav4vNoe87PvqKAvHpojHOIV-wLjQ3JdEywTXGRx0icpTJEYb8JdgIHM9~92y5C2i87GaBo2oHYJUn2h5sVHzksPPSozHDVo1-97m7kHaYqgXKFrOyMa6XP9uWL5jF2sHqzKQ9OSb7PpT1m8uoQAtlq-XoqsFvkW1qLFYb-gcuV5OuDRNrLjxAjJ9POUKytMc-1dL7KuZplOZW8HFsk8Q84wniZmlzwgDmaV9gwWRz-tpOgfmN9oP4AeGikRc8Zw3i03eufpe1wMZg-HjK6hwy6fSVPzXJvKuGQGF7tFJ-RvLRdvOZesK9nq96oFpaq5U6-RzqQDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                            <img className="tencent-cloud-logo" alt="Tencent cloud logo" src="tencent-cloud-logo.svg" />
                        </div>
                    </div>

                    <footer className="footer">
                            <div className="frame">
                            <div className="div">
                            <div className="text-wrapper">©</div>
                            <div className="text-wrapper-2">2023</div>
                            <div className="text-wrapper-3">HuupAI. All rights reserved.</div>
                            </div>
                            <div className="text-wrapper-4">Contact@HuupAI.xyz</div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};
export default Landing;

