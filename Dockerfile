FROM node

RUN apt update && apt install -y gdebi-core \
                                 busybox-static \
                                 fonts-noto \
                                 fonts-noto-cjk \
                                 fonts-noto-hinted \
                                 fonts-noto-mono \
                                 fonts-noto-unhinted \
  && mkdir -p /usr/share/fonts/noto-color-emoji \
# noto-color-emojiをdownloadしてinstallするだけ......
################################################################################
  && wget https://noto-website-2.storage.googleapis.com/pkgs/NotoColorEmoji-unhinted.zip \
  && unzip NotoColorEmoji-unhinted.zip -d /usr/share/fonts/noto-color-emoji/ \
  && rm NotoColorEmoji-unhinted.zip \
################################################################################
  && fc-cache -fv \
  && git clone https://github.com/k1nPr45b0/website-pdf-converter.git

WORKDIR website-pdf-converter

COPY .git/index /git_status
RUN yarn
